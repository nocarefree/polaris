<template>
  <component :is="url? UnstyledLink:'button'" v-bind="attributes" @click="(e: any) => $emit('action', e)">
    <WrapperComponent>
      <HorizontalStack block-align="center" :gap="polarisSummerEditions2023 ? '1_5-experimental' : '4'" :wrap="!truncate">
        <span v-if="prefix" :class="styles.Prefix">
          <component :is="prefix"></component>
        </span>
        <span v-else-if="icon" :class="styles.Prefix">
          <Icon :source="icon"></Icon>
        </span>
        <span :class="styles.Text">
          <contentComponet>
            <span v-if="truncate">{{ content }}</span>
            <template v-else>{{ ellipsis ? `${content}…` : content }}</template>
          </contentComponet>
        </span>
        <Box v-if="suffix">
          <span :class="styles.Suffix">
            <component :is="suffix"></component>
          </span>
        </Box>
      </HorizontalStack>
    </WrapperComponent>
  </component>
</template>
<script setup lang="ts">
import { computed, defineComponent, h } from "vue";
import type { ActionListItemProps } from './Item'
import UnstyledLink from "@ncpl-polaris/components/UnstyledLink";
import HorizontalStack from "@ncpl-polaris/components/HorizontalStack";
import Box from "@ncpl-polaris/components/Box";
import Icon from "@ncpl-polaris/components/Icon";
import Text from "@ncpl-polaris/components/Text";
import styles from '../ActionList.module.scss';

import { useFeatures } from '../../context';
import { classNames } from '@ncpl-polaris/utils';


defineOptions({
  name: 'NpItem',
})
const props = defineProps<ActionListItemProps>()


const { polarisSummerEditions2023 } = useFeatures();

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

const WrapperComponent = defineComponent({
  setup(_props, { slots }) {

    return () => {
      return polarisSummerEditions2023 ? h(Box, { width: '100%' }, slots) : slots.default?.();
    }
  }
})

const contentComponet = defineComponent({
  setup(_props, { slots }) {
    return () => {
      let nodes: any[] = [];

      if (props.helpText) {
        nodes.push(h(Box, {}, slots));
        nodes.push(
          h(Text, {
            as: "span",
            variant: polarisSummerEditions2023 ? 'bodySm' : undefined,
            color: polarisSummerEditions2023 && (props.active || props.disabled) ? undefined : 'subdued'
          }, { default: () => props.helpText })
        );
        return nodes
      } else {
        return slots.default?.()
      }

      ;
    }
  }
})

</script>
