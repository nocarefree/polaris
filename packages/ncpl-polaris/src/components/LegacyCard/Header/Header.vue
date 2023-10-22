<template>
  <div :class="styles.Header">
    <ConditionalWrapper :condition="Boolean(actions || $slots.default)">
      <template #wrapper="{ children }">
        <InlineStack :wrap="false" gap="200" align="space-between" block-align="center">
          <component :is="children"></component>
          <InlineStack :wrap="false" gap="400" block-align="center">
            <ButtonGroup v-if="actions">
              <component :is="buttonsFrom(actions, {variant: 'plain'})"></component>
            </ButtonGroup>
            <slot></slot>
          </InlineStack>
        </InlineStack>
      </template>

      <Text v-if="title" variant="headingSm" as="h2">
        {{ title }}
      </Text>
      <slot v-else name="title"></slot>

    </ConditionalWrapper>
  </div>
</template>
<script setup lang="ts">
import type { LegacyCardHeaderProps } from "./Header"
import Text from "../../Text";
import InlineStack from "../../InlineStack";
import ButtonGroup from "../../ButtonGroup";
import styles from '../LegacyCard.module.scss';
import { buttonsFrom } from "../../Button/utils"

import ConditionalWrapper from '../../ConditionalWrapper';

defineProps<LegacyCardHeaderProps>();
</script>