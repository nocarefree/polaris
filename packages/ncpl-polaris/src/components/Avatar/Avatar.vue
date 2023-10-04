<template>
  <span :aria-label="label" :role="label ? 'img' : 'presentation'" :class="classNames(
    styles.Avatar,
    size && styles[variationName('size', size)],
    hasImage && status === Status.Loaded && styles.imageHasLoaded,
    shape && styles[variationName('shape', shape)],
    !customer &&
    !source &&
    styles[variationName('style', styleClass(nameString))],
  )">
    <span :class="styles.Initials">
      <svg :class="styles.Svg" viewBox="0 0 40 40">
        <template v-if="customer || !initials">
          <template v-if="polarisSummerEditions2023">
            <path fill="none"
              d="M25.5 13.5C25.5 16.5376 23.0376 19 20 19C16.9624 19 14.5 16.5376 14.5 13.5C14.5 10.4624 16.9624 8 20 8C23.0376 8 25.5 10.4624 25.5 13.5Z"
              stroke="currentColor" :stroke-width="avatarStrokeWidth[size]" />
            <path fill="none"
              d="M10.3433 29.682L9.47 31.254C9.03481 32.0373 9.60125 33 10.4974 33H29.5026C30.3988 33 30.9652 32.0373 30.53 31.254L29.6567 29.682C27.7084 26.175 24.0119 24 20 24C15.9882 24 12.2916 26.175 10.3433 29.682Z"
              stroke="currentColor" :stroke-width="avatarStrokeWidth[size]" stroke-linecap="round"
              stroke-linejoin="round" />
          </template>
          <template>
            <path fill="currentColor"
              d="M8.28 27.5A14.95 14.95 0 0120 21.8c4.76 0 8.97 2.24 11.72 5.7a14.02 14.02 0 01-8.25 5.91 14.82 14.82 0 01-6.94 0 14.02 14.02 0 01-8.25-5.9zM13.99 12.78a6.02 6.02 0 1112.03 0 6.02 6.02 0 01-12.03 0z" />
          </template>
        </template>
        <text :class="classNames(
          styles.Text,
          (initials?.length || 0) > 2 && styles.long,
        )" x="50%" y="50%" dy="0.35em" fill="currentColor" textAnchor="middle">
          {{ initials }}
        </text>
      </svg>
    </span>
    <Image v-if="source && isMounted && status !== Status.Errored" :class="classNames(
      styles.Image,
      status !== Status.Loaded && styles.hidden,
    )" :source="source" alt="" role="presentation" @load="handleLoad" @error="handleError" />
  </span>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { AvatarProps, STYLE_CLASSES } from './Avatar'
import { Size } from "./types"
import styles from './Avatar.module.scss'
import { classNames, variationName } from '@ncpl-polaris/utils';
import Image from "@ncpl-polaris/components/Image";
import { useI18n, useFeatures } from '../context';
import { useMounted } from '@vueuse/core'


enum Status {
  Pending = 'PENDING',
  Loaded = 'LOADED',
  Errored = 'ERRORED',
}

defineOptions({
  name: 'NpAvatar',
})

const emit = defineEmits(['error']);
const props = withDefaults(defineProps<AvatarProps>(), { size: 'medium', shape: 'round' });
const i18n = useI18n();
const { polarisSummerEditions2023 } = useFeatures();
const isMounted = useMounted()
const nameString = computed(() => props.name || props.initials);
const status = ref(Status.Pending);
const avatarStrokeWidth: { [S in Size]: string } = {
  extraSmall: '3',
  small: '2.5',
  medium: '2.5',
  large: '2.5',
  'xl-experimental': '2',
  '2xl-experimental': '1.5',
};


const hasImage = computed(() => {
  return props.source && status.value !== Status.Errored;
})

const label = computed(() => {
  const { accessibilityLabel, name, initials } = props;
  if (accessibilityLabel) {
    return accessibilityLabel;
  } else if (name) {
    return name;
  } else if (initials) {
    const splitInitials = initials.split('').join(' ');
    return i18n.value.translate('Polaris.Avatar.labelWithInitials', {
      initials: splitInitials,
    });
  }
  return undefined;
})

const handleError = () => {
  status.value = Status.Errored;
  emit('error')
};
const handleLoad = () => {
  status.value = Status.Loaded;
};

function xorHash(str: string) {
  let hash = 0;

  for (const char of str) {
    hash ^= char.charCodeAt(0);
  }

  return hash;
}

function styleClass(name?: string) {
  return name
    ? STYLE_CLASSES[xorHash(name) % STYLE_CLASSES.length]
    : STYLE_CLASSES[0];
}
</script>
