<template>
  <div :class="pageClassName">
    <Header v-if="hasHeaderContent || $slots.primaryAction" v-bind="headerProps">
      <template v-if="$slots.titleMetadata" #titleMetadata>
        <slot name="titleMetadata"></slot>
      </template>
      <template v-if="$slots.primaryAction" #primaryAction>
        <slot name="primaryAction"></slot>
      </template>
    </Header>
    <div :class="contentClassName">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { PageProps } from './Page'
import Header from './Header'
import styles from './Page.module.css'
import { classNames } from '../../utils';

defineOptions({
  name: 'NpPage',
})
const props = defineProps<PageProps>()

const pageClassName = computed(() => {
  return classNames(
    styles.Page,
    props.fullWidth && styles.fullWidth,
    props.narrowWidth && styles.narrowWidth,
  );;
})

const headerProps = computed(() => {
  const {
    fullWidth,
    narrowWidth,
    divider,
    ...rest
  } = props;
  return rest;
})

const hasHeaderContent = computed(() => {
  return (props.title != null && props.title !== '') ||
    (props.subtitle != null && props.subtitle !== '') ||
    props.primaryAction != null ||
    (props.secondaryActions != null &&
      ((Array.isArray(props.secondaryActions) &&
        props.secondaryActions.length > 0) ||
        (props.secondaryActions))) ||
    (props.actionGroups != null && props.actionGroups.length > 0) ||
    props.backAction != null;
})

const contentClassName = computed(() => {
  return classNames(
    !hasHeaderContent.value && styles.Content,
  );
});

</script>
