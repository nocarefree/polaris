<template>
  <LegacyCard>
    <div :class="containerClassName">
      <div :class="styles.Dismiss">
        <Button v-if="dismiss" variant="plain" :icon="CancelSmallMinor" @click="$emit('dismss')"
          accessibility-label="Dismiss card" />
      </div>
      <LegacyCardSection>
        <div :class="styles.CalloutCard">
          <div :class="styles.Content">
            <div :class="styles.Title">
              <Text variant="headingMd" as="h2">
                <template v-if="title">{{ title }}</template>
                <slot v-else name="title"></slot>
              </Text>
            </div>
            <TextContainer>
              <slot></slot>
            </TextContainer>
            <div :class="styles.Buttons">
              <ConditionalWrapper :condition="Boolean(secondaryAction)">
                <template #wrapper="{ children }">
                  <component :is="children"></component>
                  <component :is="buttonFrom(secondaryAction,{  variant: 'tertiary' })"></component>
                </template>
                <component :is="buttonFrom(primaryAction)"></component>
              </ConditionalWrapper>
            </div>
          </div>

          <Image alt="" :class="imageClassName" :source="illustration" />
        </div>
      </LegacyCardSection>
    </div>
  </LegacyCard>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { CalloutCardProps } from './CalloutCard';
import styles from './CalloutCard.module.scss';
import LegacyCard from '../LegacyCard';
import LegacyCardSection from '../LegacyCard/Section';
import Button from '../Button';
import { buttonFrom } from '../Button/utils';
import Text from '../Text';
import Image from '../Image';
import TextContainer from '../TextContainer';
import ConditionalWrapper from '../ConditionalWrapper';
import { classNames } from "@ncpl-polaris/utils";
import { CancelSmallMinor } from "@ncpl/ncpl-icons";

defineOptions({
  name: 'NpCalloutCard',
})

defineEmits(['dismss'])
const props = defineProps<CalloutCardProps>()


const imageClassName = computed(() => classNames(
  styles.Image,
  props.dismiss && styles.DismissImage,
));

const containerClassName = computed(() => classNames(
  styles.Container,
  props.dismiss && styles.hasDismiss,
));
</script>
