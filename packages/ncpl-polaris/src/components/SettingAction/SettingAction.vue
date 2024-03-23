<template>
  <div :class="styles.SettingAction">
    <div :class="styles.Setting">
      <slot></slot>
    </div>
    <div :class="styles.Action">
      <slot name="action"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">

import styles from './SettingAction.module.scss';

defineOptions({
  name: 'NpSettingAction',
});
</script>
