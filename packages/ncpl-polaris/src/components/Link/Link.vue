<template>
  <NpUnstyledLink v-if="url" :class="className">
    <slot></slot>
  </NpUnstyledLink>
  <button v-else :class="className" type="button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NpUnstyledLink } from "@ncpl-polaris/components";
import { classNames } from "@ncpl-polaris/utils";
import { bannerContext } from "../context";
import { linkProps } from "./Link";
import styles from "./Link.module.scss";

defineOptions({
  name: "NpLink",
});
const props = defineProps(linkProps);
const banner = bannerContext.inject();

const shouldBeMonochrome = computed(() => {
  return props.monochrome || banner;
})

const className = computed(() => {
  return classNames(
    styles.Link,
    shouldBeMonochrome.value && styles.monochrome,
    props.removeUnderline && styles.removeUnderline,
  )
});
</script>
