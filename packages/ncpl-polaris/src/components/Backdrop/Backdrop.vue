<template>
  <div :class="classNames(
    styles.Backdrop,
    transparent && styles.transparent,
    belowNavigation && styles.belowNavigation,
  )" @mousedown="$emit('closing', true)" @mouseup="$emit('closing', false)" @click.native="e => $emit('click', e)"
    @touchstart.passive="e => $emit('click', e)"></div>
  <ScrollLock />
</template>
<script setup lang="ts">
import ScrollLock from "../ScrollLock"
import { classNames } from "../../utils";
import type { BackdropProps } from "./Backdrop"
import styles from "./Backdrop.module.scss";

defineProps<BackdropProps>();
defineEmits(["click", "closing"]);
</script>

