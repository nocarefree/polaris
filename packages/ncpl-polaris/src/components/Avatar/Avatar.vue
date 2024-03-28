<template>
  <span :aria-label="label" :role="label ? 'img' : 'presentation'" :class="classNames(
    styles.Avatar,
    size && styles[variationName('size', size)],
    hasImage && status === Status.Loaded && styles.imageHasLoaded,
    !customer && !source && styles[variationName('style', styleClass(nameString))],
  )">
    <span v-if="!hasImage" :class="styles.Initials">
      <svg :class="styles.Svg" viewBox="0 0 40 40">
        <template v-if="customer || !initials">
          <path fill="none"
            d="M25.5 13.5C25.5 16.5376 23.0376 19 20 19C16.9624 19 14.5 16.5376 14.5 13.5C14.5 10.4624 16.9624 8 20 8C23.0376 8 25.5 10.4624 25.5 13.5Z"
            stroke="currentColor" :strokeWidth="avatarStrokeWidth[size]" />
          <path fill="none"
            d="M10.3433 29.682L9.47 31.254C9.03481 32.0373 9.60125 33 10.4974 33H29.5026C30.3988 33 30.9652 32.0373 30.53 31.254L29.6567 29.682C27.7084 26.175 24.0119 24 20 24C15.9882 24 12.2916 26.175 10.3433 29.682Z"
            stroke="currentColor" :strokeWidth="avatarStrokeWidth[size]" strokeLinecap="round" strokeLinejoin="round" />
        </template>
        <text v-else :class="classNames(styles.Text, (initials?.length || 0) > 2 && styles.long)" x="50%" y="50%"
          :dy="verticalOffset" fill="currentColor" text-anchor="middle">
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
import styles from './Avatar.module.scss'
import { classNames, variationName } from '../../utils';
import Image from "../Image";
import { useI18n } from '../context';
import { useMounted } from '@vueuse/core'


enum Status {
  Pending = 'PENDING',
  Loaded = 'LOADED',
  Errored = 'ERRORED',
}

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const avatarStrokeWidth: { [S in Size]: string } = {
  xs: '3',
  sm: '2.5',
  md: '2.5',
  lg: '2.5',
  xl: '2',
};

const verticalOffset = '0.35em';

defineOptions({
  name: 'NpAvatar',
})

const emit = defineEmits(['error']);
const props = withDefaults(defineProps<AvatarProps>(), { size: 'md' });
const i18n = useI18n();
const isMounted = useMounted()
const nameString = computed(() => props.name || props.initials);
const status = ref(Status.Pending);

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
