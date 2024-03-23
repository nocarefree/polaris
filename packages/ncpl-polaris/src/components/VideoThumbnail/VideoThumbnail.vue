<template>
  <div :class="styles.ThumbnailContainer">
    <div :class="styles.Thumbnail" :style="{ backgroundImage: `url(${thumbnailUrl})` }" />
    <button type="button" :class="styles.PlayButton" :aria-label="buttonLabel" @click="e => $emit('click', e)"
      @mouseenter="onBeforeStartPlaying" @focus="onBeforeStartPlaying" @touchstart="onBeforeStartPlaying">
      <div v-if="videoLength" :class="styles.Timestamp">
        <LegacyStack alignment="center" spacing="extraTight">
          <span :class="styles.PlayIcon">
            <Icon :source="PlayIcon" />
          </span>
          <Text :variant="isNavigationCollapsed ? 'bodyLg' : 'bodyMd'" as="p" fontWeight="semibold">
            {{ secondsToTimestamp(videoLength) }}
          </Text>
        </LegacyStack>
      </div>
    </button>
    <div v-if="showVideoProgress" :class="styles.Progress">
      <progress :class="styles.ProgressBar" :value="progressValuePercents" max="100" />
      <div :class="styles.Indicator" :style="{ transform: `scaleX(${progressValue})` }">
        <span :class="styles.Label">{{ progressValuePercents }}%</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { VideoThumbnailProps } from './VideoThumbnail';
import LegacyStack from "../LegacyStack";
import Icon from "../Icon";
import Text from "../Text";
import styles from './VideoThumbnail.module.scss';
import { PlayIcon } from "@ncpl/ncpl-icons";
import { useI18n, useMediaQuery } from '../context';
import {
  secondsToTimeComponents,
  secondsToTimestamp,
  secondsToDurationTranslationKey,
} from '@ncpl-polaris/utils/duration';

defineOptions({
  name: 'NpVideoThumbnail',
})

const emit = defineEmits(['beforeStartPlaying', 'click'])
const props = withDefaults(defineProps<VideoThumbnailProps>(), {
  videoLength: 0,
  videoProgress: 0,
  showVideoProgress: false,
})
const i18n = useI18n();
const { isNavigationCollapsed } = useMediaQuery();

const buttonLabel = computed(() => {
  const { accessibilityLabel, videoLength } = props;
  if (accessibilityLabel) {
    return accessibilityLabel;
  }

  if (videoLength) {
    const { hours, minutes, seconds } = secondsToTimeComponents(videoLength);

    return i18n.value.translate(
      'Polaris.VideoThumbnail.playButtonA11yLabel.defaultWithDuration',
      {
        duration: i18n.value.translate(secondsToDurationTranslationKey(videoLength), {
          hourCount: hours,
          minuteCount: minutes,
          secondCount: seconds,
        }),
      },
    );
  }

  return i18n.value.translate('Polaris.VideoThumbnail.playButtonA11yLabel.default')
})

const progressValue = computed(() => calculateProgress(props.videoLength, props.videoProgress));
const progressValuePercents = computed(() => Math.round(progressValue.value * 100));

const onBeforeStartPlaying = () => {
  emit('beforeStartPlaying')
}


function calculateProgress(videoLength: number, videoProgress: number) {
  if (videoProgress > videoLength && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Value passed to the video progress should not exceed video length. Resetting progress to 100%.',
    );
  }

  if (videoProgress > 0 && videoLength > 0) {
    const progress = parseFloat((videoProgress / videoLength).toFixed(2));
    return progress > 1 ? 1 : progress;
  }

  return 0;
}
</script>
