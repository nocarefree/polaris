<template>
  <LegacyCard>
    <div :class="mediaCardClassName">
      <div :class="mediaContainerClassName">
        <slot></slot>
      </div>
      <div :class="infoContainerClassName">
        <Box padding="500">
          <BlockStack gap="200">
            <InlineStack :wrap="false" align="space-between" gap="200">
              <div v-if="title || $slots.title">
                <Text v-if="title" variant="headingSm" as="h2"> {{ title }} </Text>
                <slot v-else name="title"></slot>
              </div>
              <Box v-if="popoverActions.length > 0 || dismiss" position="absolute" inset-inline-end="500"
                z-index="var(--p-z-index-2)">
                <InlineStack gap="100" :wrap="false">
                  <Popover v-if="popoverActions.length > 0" :active="popoverActive" @close="togglePopoverActive"
                    preferredAlignment="left" preferred-position="below">
                    <template #activator>
                      <InlineStack block-align="center">
                        <Button :icon="MenuHorizontalIcon" @click="togglePopoverActive" size="slim"
                          accessibility-lLabel="i18n.translate('Polaris.MediaCard.popoverButton')" variant="tertiary" />
                      </InlineStack>
                    </template>
                    <ActionList :items="popoverActions" @actionAnyItem="togglePopoverActive" />
                  </Popover>
                  <Button v-if="dismiss" :icon="XIcon" @click="$emit('dismiss')" size="slim"
                    :accessibility-label="i18n.translate('Polaris.MediaCard.dismissButton')" variant="tertiary" />
                </InlineStack>
              </Box>
            </InlineStack>
            <p :class="styles.Description">{{ description }}</p>
            <div v-if="primaryAction || secondaryAction" :class="actionClassName">
              <ButtonGroup>
                <div v-if="primaryAction">
                  <component :is="buttonFrom(primaryAction)" />
                </div>
                <div v-if="secondaryAction">
                  <component :is="buttonFrom(secondaryAction)" />
                </div>
              </ButtonGroup>
            </div>
          </BlockStack>
        </Box>
      </div>
    </div>
  </LegacyCard>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { MediaCardProps } from './MediaCard';
import styles from './MediaCard.module.scss';
import LegacyCard from "../LegacyCard";
import Box from "../Box";
import BlockStack from "../BlockStack";
import InlineStack from "../InlineStack";
import Text from "../Text";
import Popover from "../Popover";
import ButtonGroup from "../ButtonGroup";
import Button from "../Button";
import ActionList from "../ActionList";
import { useI18n } from "../context"
import { classNames } from "@ncpl-polaris/utils";
import { buttonFrom } from "../Button/utils"
import { XIcon, MenuHorizontalIcon } from "@ncpl/ncpl-icons";

defineOptions({
  name: 'NpMediaCard',
})

defineEmits(['dismiss']);

const props = withDefaults(defineProps<MediaCardProps>(), {
  popoverActions: () => [],
  portrait: false,
  size: 'medium',
})

const i18n = useI18n();

const popoverActive = ref(false);

const mediaCardClassName = computed(() => classNames(
  styles.MediaCard,
  props.portrait && styles.portrait,
));

const mediaContainerClassName = computed(() => classNames(
  styles.MediaContainer,
  props.portrait && styles.portrait,
  props.size === 'small' && styles.sizeSmall,
));

const infoContainerClassName = computed(() => classNames(
  styles.InfoContainer,
  props.portrait && styles.portrait,
  props.size === 'small' && styles.sizeSmall,
));

const actionClassName = computed(() => classNames(
  styles.ActionContainer,
  props.portrait && styles.portrait,
));

const togglePopoverActive = () => {
  popoverActive.value = !popoverActive.value
}
</script>
