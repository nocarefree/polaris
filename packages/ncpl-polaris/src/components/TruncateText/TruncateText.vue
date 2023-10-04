<template>
  <Text v-if="isOverflowing" as="span" truncate>
    <Box width="100%" ref="textRef">
      <slot></slot>
    </Box>
  </Text>
  <Tooltip v-else z-index-override="Number(zIndex['z-index-11'])" preferred-position=" above" hover-delay="1000"
    content="children" dismiss-on-mouse-out>
    <Text as="span" truncate>
      <slot></slot>
    </Text>
  </Tooltip>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

import Text from "@ncpl-polaris/components/Text";
import Tooltip from "@ncpl-polaris/components/Tooltip";
import Box from "@ncpl-polaris/components/Box";

const isOverflowing = ref(false);
const textRef = ref();

onMounted(() => {
  isOverflowing.value = textRef.value.scrollWidth > textRef.value.offsetWidth;
});
</script>
