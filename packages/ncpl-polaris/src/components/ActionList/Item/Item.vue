<template>
  <component :is="url? UnstyledLink:'button'" v-bind="attributes" @click="(e: any) => $emit('action', e)">
    <Box width="100%">
      <InlineStack block-align="center" gap="150" :wrap="!truncate">
        <span v-if="prefix" :class="styles.Prefix">
          <component :is="prefix"></component>
        </span>
        <span v-else-if="icon" :class="styles.Prefix">
          <Icon :source="icon"></Icon>
        </span>
        <span v-else-if="image" role="presentation" :class="styles.Prefix"
          :style="{ backgroundImage: `url(${image}` }"></span>
        <span :class="styles.Text">
          <ConditionalWrapper :condition="Boolean(helpText)">
            <TruncateText v-if="truncate && content" :content="content"></TruncateText>
            <template v-else>{{ ellipsis ? `${content}…` : content }}</template>
            <template #wrapper="{ children }">
              <Box>
                <component :is="children"></component>
              </Box>
              <Text as="span" variant="bodySm" :tone="active || disabled ? undefined : 'subdued'">
                <component :is="()=>[helpText]"></component>
              </Text>
            </template>
          </ConditionalWrapper>
        </span>
        <Box v-if="suffix">
          <span :class="styles.Suffix">
            <component :is="suffix"></component>
          </span>
        </Box>
      </InlineStack>
    </Box>
  </component>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { ActionListItemProps } from './Item'
import UnstyledLink from "../../UnstyledLink";
import InlineStack from "../../InlineStack";
import TruncateText from "./TruncateText.vue"
import Box from "../../Box";
import Icon from "../../Icon";
import Text from "../../Text";
import ConditionalWrapper from "../../ConditionalWrapper";
import styles from '../ActionList.module.css';
import { classNames } from '../../../utils';



defineOptions({
  name: 'NpItem',
})
const props = defineProps<ActionListItemProps>()

const attributes = computed(() => {
  const { id, url, disabled, destructive, active, variant, accessibilityLabel, role } = props;

  let className = classNames(
    styles.Item,
    disabled && styles.disabled,
    destructive && styles.destructive,
    active && styles.active,
    variant === 'default' && styles.default,
    variant === 'indented' && styles.indented,
    variant === 'menu' && styles.menu,
  );

  let _attrs: any = {
    id,
    class: className,
    ariaLabel: accessibilityLabel,
    role,
  }

  if (url) {
    _attrs.url = disabled ? null : url;
  } else {
    _attrs.type = 'button';
    _attrs.disabled = disabled;
    _attrs.onMouseUp = (event: MouseEvent) => (event.currentTarget as HTMLButtonElement).blur();
  }
  return _attrs;
})

</script>
