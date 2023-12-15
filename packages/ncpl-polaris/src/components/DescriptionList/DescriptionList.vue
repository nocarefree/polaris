<template>
  <dl :className="classNames(
    styles.DescriptionList,
    gap === 'tight' && styles.spacingTight,
  )">
    <template v-for="({ term, description }) in items">
      <dt :className="styles.Term">
        <Text as="span" variant="headingSm">
          <template v-if="(typeof term == 'string')">{{ term }}</template>
          <component v-else :is="term" />
        </Text>
      </dt>
      <dd :className="styles.Description">
        <template v-if="(typeof description == 'string')">{{ description }}</template>
        <component v-else :is="description" />
      </dd>
    </template>
  </dl>
</template>
<script setup lang="ts">
import type { DescriptionListProps } from './DescriptionList';
import styles from './DescriptionList.module.scss';
import Text from "../Text";
import { classNames } from "@ncpl-polaris/utils";

defineOptions({
  name: 'NpDescriptionList',
})
defineProps<DescriptionListProps>()
</script>
