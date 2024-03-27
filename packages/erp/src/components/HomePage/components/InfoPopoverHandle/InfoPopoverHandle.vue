<template>
  <UnstyledButton :class="styles.infoIconContainer" onMouseEnter: s, onMouseLeave: i, onKeyDown: u, onKeyUp: c, onFocus:
    o, onBlur: r,>
    <NpIcon :source="InfoIcon"></NpIcon>
  </UnstyledButton>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import styles from "../../HomePage.module.scss";
import { InfoIcon } from "@ncpl/ncpl-icons";


const s = () => {
  t(e)
},
  i = () => {
    t(null)
  },
  o = () => {
    t(e)
  },
  r = () => {
    t(null)
  },
  c = l => {
    l.key === 'Escape' &&
      (a && l.stopPropagation(), l.preventDefault(), t(null))
  },
  u = l => {
    l.key === 'Enter' &&
      (l.preventDefault(), t(a ? null : e)),
      l.key === 'Tab' &&
      t(null)
  };
</script>
