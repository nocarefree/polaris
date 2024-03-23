<template>
  <LegacyStack alignment="center" vertical>
    <Image v-if="withIllustration" :alt="i18n.translate('Polaris.EmptySearchResult.altText')" :source="emptySearch"
      draggable="false" />
    <Text variant="headingLg" as="p">
      {{ title }}
    </Text>
    <Text color="subdued" as="span">
      <p v-if="description">{{ description }}</p>
    </Text>
  </LegacyStack>
</template>
<script setup lang="ts">
import type { EmptySearchResultProps } from './EmptySearchResult'
import Image from "../Image"
import LegacyStack from "../LegacyStack"
import Text from "../Text"
import { useI18n } from '../context'
import emptySearch from "./illustrations/empty-search.svg"

defineOptions({
  name: 'NpEmptySearchResult',
})
defineProps<EmptySearchResultProps>()

const i18n = useI18n();
</script>
