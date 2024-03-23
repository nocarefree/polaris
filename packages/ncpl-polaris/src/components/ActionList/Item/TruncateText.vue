<template>
  <Tooltip v-if="isOverflowing" :z-index-override="Number(theme.zIndex['z-index-11'])" preferred-position="above"
    :hover-delay="1000" :content="content" dismiss-on-mouse-out>
    <Text as="span" truncate>
      {{ content }}
    </Text>
  </Tooltip>
  <Text v-else as="span" truncate>
    <Box width="100%" ref="textRef">
      {{ content }}
    </Box>
  </Text>
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import Tooltip from "../../Tooltip"
import Text from "../../Text"
import Box from "../../Box"
import { useTheme } from "../../context"

const props = defineProps<{
  content: string;
}>();

const isOverflowing = ref(false);
const textRef = ref();
const theme = useTheme();

watch(() => props.content, () => {
  if (textRef.value) {
    isOverflowing.value = textRef.value.scrollWidth > textRef.value.offsetWidth
  }
}, { flush: 'post', immediate: true })

</script>