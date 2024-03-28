<template>
  <a :href="url" v-bind="_attrs" @click="onClick">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { computed, useAttrs, unref, getCurrentInstance } from "vue"
import { linkContext, routerContext } from '../context';
import { UnstyledLinkProps } from "./UnstyledLink"
import { unstyled } from "../shared"

defineOptions({
  name: 'NpUnstyledLink',
})


const props = defineProps<UnstyledLinkProps>()
const attrs = useAttrs();
const instance = getCurrentInstance()!
const router = instance.appContext.config.globalProperties.$router;
const linkComponent = linkContext.inject();
const hasRouter = routerContext.inject();

const onClick = (event: Event) => {
  if (hasRouter && router) {
    router.push(props.url)
    event.preventDefault();
    return false;
  }

}

const _attrs = computed(() => {
  let _linkComponent = unref(linkComponent);
  if (_linkComponent) {
    return { ...attrs, ...unstyled.props };
  }

  let { external, target: targetProp } = props;
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
    rel,
    ...unstyled.props,
  };
})
</script>
