<template>
  <Box width="100%" padding="300" border-radius="300">
    <InlineStack align="space-between" :block-align="blockAlign" :wrap="false">
      <Box width="100%">
        <InlineStack gap="200" :wrap="false" :block-align="blockAlign">

          <div v-if="$slots.bannerIcon" ref="iconNode">
            <Box :background="backgroundColor" border-radius="200" padding="100">
              <slot name="bannerIcon"></slot>
            </Box>
          </div>
          <Box ref="contentNode" width="100%">
            <BlockStack gap="200">
              <div>
                <slot></slot>
              </div>
              <slot name="actionButtons"></slot>
            </BlockStack>
          </Box>
        </InlineStack>
      </Box>
      <slot name="dismissButton"></slot>
    </InlineStack>
  </Box>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ColorTextAlias, ColorBackgroundAlias } from '@shopify/polaris-tokens';
import Box from "../Box";
import BlockStack from "../BlockStack";
import InlineStack from "../InlineStack";
import { useEventListener } from "@vueuse/core";

defineProps<{ backgroundColor: ColorBackgroundAlias, textColor: ColorTextAlias }>()

const blockAlign = ref<'start' | 'center'>('center');
const contentNode = ref<HTMLDivElement>();
const iconNode = ref<HTMLDivElement>();

const handleResize = () => {
  const contentHeight = contentNode.value?.offsetHeight;
  const iconBoxHeight = iconNode.value?.offsetHeight;

  if (!contentHeight || !iconBoxHeight) return;

  contentHeight > iconBoxHeight ? (blockAlign.value = 'start') : (blockAlign.value = 'center');
};

onMounted(() => handleResize());
useEventListener(window, 'resize', handleResize);

</script>