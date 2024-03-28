<template>
  <NpUnstyledButton :class="styles.infoIconContainer" @mouseenter="$emit('update:active', id)"
    @mouseleave="$emit('update:active', null)" @keydown="onKeyDown" @keyup="onKeyUp" @focus="o" @blur="r">
    <NpIcon :source="InfoIcon"></NpIcon>
  </NpUnstyledButton>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { NpUnstyledButton, NpIcon } from "@ncpl/ncpl-polaris";
import styles from "../../HomePage.module.scss";
import { InfoIcon } from "@ncpl/ncpl-icons";

const props = defineProps<{ id: string; active: boolean; }>()
const emit = defineEmits(['update:active'])

const onKeyUp = (l: KeyboardEvent) => {
  l.key === 'Escape' &&
    (props.active && l.stopPropagation(), l.preventDefault(), emit('update:active', null))
};

const onKeyDown = (l: KeyboardEvent) => {
  l.key === 'Enter' &&
    (l.preventDefault(), emit('update:active', props.active ? null : props.active)),
    l.key === 'Tab' &&
    emit('update:active', null)
};
</script>
