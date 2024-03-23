<template>
  <div :class="classNames(styles.Label, hidden && styles.hidden)">
    <label :id="labelID(id)" :htmlFor="id" :class="classNames(styles.Text, requiredIndicator &&
      styles.RequiredIndicator)">
      <slot></slot>
    </label>
  </div>
</template>
<script setup lang="ts">
import { labelID, type LabelProps } from './Label'
import styles from './Label.module.scss'
import { classNames } from '../../utils';

defineOptions({
  name: 'NpLabel',
})
defineProps<LabelProps>()
</script>
