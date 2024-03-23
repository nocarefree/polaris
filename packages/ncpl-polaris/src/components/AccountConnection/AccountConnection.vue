<template>
  <Card>
    <SettingAction>
      <template v-if="action" #action>
        <component :is="()=>buttonFrom(action!, {variant: connected ? undefined : 'primary'})"></component>
      </template>
      <InlineStack gap="400">
        <span v-if="connected">
          <Avatar accessibilityLabel="" :name="accountName" :initials="initials" :source="avatarUrl" />
        </span>
        <BlockStack gap="100">
          <Text as="h2" variant="headingSm">
            <slot v-if="$slots.title" name="title"></slot>
            <template v-else-if="title">{{ title }}</template>
            <template v-else>{{ accountName }}</template>
          </Text>
          <Text as="span" tone="subdued">
            <slot v-if="$slots.details" name="details"></slot>
            <template v-else-if="details">{{ details }}</template>
          </Text>
        </BlockStack>
      </InlineStack>
    </SettingAction>
    <Box v-if="$slots.termsOfService" :padding-block-start="mdUp ? '400' : '500'">
      <slot name="termsOfService"></slot>
    </Box>
  </Card>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { buttonFrom } from "../Button/utils"
import Card from "../Card";
import SettingAction from "../SettingAction";
import Box from "../Box";
import InlineStack from "../InlineStack";
import Avatar from "../Avatar";
import BlockStack from "../BlockStack";
import type { AccountConnectionProps } from './AccountConnection';
import { useBreakpoints } from "../context";

defineOptions({
  name: 'NpAccountConnection',
})
const props = defineProps<AccountConnectionProps>()

const { mdUp } = useBreakpoints();

const initials = computed(() => props.accountName
  ? props.accountName
    .split(/\s+/)
    .map((name) => name[0])
    .join('')
  : undefined);

</script>
