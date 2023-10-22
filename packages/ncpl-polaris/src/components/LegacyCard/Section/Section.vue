<template>
  <div :class="classNames(
    styles.Section,
    flush && styles['Section-flush'],
    subdued && styles['Section-subdued'],
    fullWidth && styles['Section-fullWidth'],
    hideOnPrint && styles['Section-hideOnPrint'],
  )">
    <div :class="styles.SectionHeader">
      <ConditionalWrapper :condition="Boolean(actions)">
        <template #wrapper="{ children }">
          <LegacyStack alignment="baseline">
            <LegacyStackItem fill>
              <component :is="children"></component>
            </LegacyStackItem>
            <ButtonGroup>
              <component :is="buttonsFrom(actions!, {variant: 'plain'})"></component>
            </ButtonGroup>
          </LegacyStack>
        </template>
        <Text v-if="title" variant="headingSm" as="h3" font-weight="medium">
          {{ title }}
        </Text>
        <slot v-else name="title"></slot>
      </ConditionalWrapper>
    </div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import type { LegacyCardSectionProps } from "./Section"
import Text from "../../Text";
import ConditionalWrapper from "../../ConditionalWrapper";
import LegacyStack from "../../LegacyStack";
import LegacyStackItem from "../../LegacyStack/Item";
import ButtonGroup from "../../ButtonGroup";
import { buttonsFrom } from "../../Button/utils";

import styles from '../LegacyCard.module.scss';
import { classNames } from '@ncpl-polaris/utils';

defineProps<LegacyCardSectionProps>();
</script>