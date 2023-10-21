<template>
  <transition :enter-active-class="styles['LoadingContainer-enter-active']"
    :enter-to-class="styles['LoadingContainer-enter']" :leave-active-class="styles['LoadingContainer-exit-active']"
    :leave-to-class="styles['LoadingContainer-exit']" :duration="parseInt(theme.motion['motion-duration-100'], 10)"
    appear>
    <div v-if="loading" :class="styles.LoadingPanel">
      <div :class="styles.LoadingPanelRow">
        <Spinner size="small" />
        <span :class="styles.LoadingPanelText">
          {{ i18n.translate('Polaris.IndexTable.resourceLoadingAccessibilityLabel', {
            resourceNamePlural: resourceNamePlural,
          })
          }}
        </span>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import styles from '../IndexTable.module.scss';
import { useI18n, useTheme } from '../../context';
import Spinner from "../../Spinner";

defineProps<{ loading?: boolean; resourceNamePlural: string | number }>()

const i18n = useI18n();
const theme = useTheme();

</script>
