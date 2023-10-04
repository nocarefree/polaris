<template>
  <nav role="navigation">
    <Button v-if="polarisSummerEditions2023" :key="backAction.content"
      :url="'url' in backAction ? backAction.url : undefined"
      @click="'onAction' in backAction ? backAction.onAction : undefined" @pointerDown="handleMouseUpByBlurring"
      :icon="ArrowLeftMinor" :accessibility-label="backAction.accessibilityLabel ?? backAction.content" />
    <template v-else>
      <UnstyledLink v-if="'url' in backAction" :key="backAction.content" :url="backAction.url" :class="styles.Breadcrumb"
        @mouseUp="handleMouseUpByBlurring" :aria-label="backAction.accessibilityLabel">
        <span :class="styles.Icon">
          <Icon :source="ArrowLeftMinor" />
        </span>
        <Text as="span" visuallyHidden>
          {{ backAction.content }}
        </Text>
      </UnstyledLink>
      <button v-else :class="styles.Breadcrumb" @click="backAction.onAction" @mouseUp="handleMouseUpByBlurring"
        type="button" :aria-label="backAction.accessibilityLabel">
        <span :class="styles.Icon">
          <Icon :source="ArrowLeftMinor" />
        </span>
        <Text as="span" visuallyHidden>
          {{ backAction.content }}
        </Text>
      </button>
    </template>
  </nav>
</template>
<script setup lang="ts">
import type { BreadcrumbsProps } from './Breadcrumbs'
import styles from './Breadcrumbs.module.scss'
import { useFeatures } from "../context"
import UnstyledLink from "@ncpl-polaris/components/UnstyledLink"
import Button from "@ncpl-polaris/components/Button"
import Text from "@ncpl-polaris/components/Text"
import Icon from "@ncpl-polaris/components/Icon"
import { handleMouseUpByBlurring } from '@ncpl-polaris/utils/focus';
import { ArrowLeftMinor } from "@ncpl/ncpl-icons"

defineOptions({
  name: 'NpBreadcrumbs',
})
defineProps<BreadcrumbsProps>()

const { polarisSummerEditions2023 } = useFeatures();
</script>
