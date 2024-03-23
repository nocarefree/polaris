<template>
  <component :is="url ? NpUnstyledLink : 'button'"
    :class="classNames(styles.Link, shouldBeMonochrome && styles.monochrome, removeUnderline && styles.removeUnderline,)"
    @click="(e: any) => $emit('click', e)" :url="url" :type="url ? undefined : 'button'" :aria-label="accessibilityLabel"
    :data-primary-link="dataPrimaryLink">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NpUnstyledLink } from "@ncpl-polaris/components";
import { classNames } from "@ncpl-polaris/utils";
import { bannerContext } from "../context";
import type { LinkProps } from "./Link";
import styles from "./Link.module.scss";

defineOptions({
  name: "NpLink",
});
const props = defineProps<LinkProps>();
const banner = bannerContext.inject();

const shouldBeMonochrome = computed(() => {
  return props.monochrome || banner;
})

</script>
