<template>
  <component :is="linkComponent || 'a'" v-bind="_attrs">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs, unref } from "vue"
import { linkContext } from '../context';
import { UnstyledLinkProps } from "./UnstyledLink"
import { unstyled } from "@ncpl-polaris/components/shared"

defineOptions({
  name: 'NpUnstyledLink',
})

const props = defineProps<UnstyledLinkProps>()
const attrs = useAttrs();
const linkComponent = linkContext.inject();


const _attrs = computed(() => {
  let _linkComponent = unref(linkComponent);
  if (_linkComponent) {
    return { ...attrs, ...unstyled.props };
  }

  let { external, url, target: targetProp } = props;
  let target;

  if (external) {
    target = '_blank';
  } else {
    target = targetProp ?? undefined;
  }
  let rel = target === '_blank' ? 'noopener noreferrer' : undefined;
  return {
    target,
    ...attrs,
    href: url,
    rel,
    ...unstyled.props,
  };
})
</script>
