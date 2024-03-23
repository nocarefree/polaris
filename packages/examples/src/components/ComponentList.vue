<template>
  <NpPage v-if="group" :title="formatTitle(group.title)" full-width>
    <NpText variant="bodyLg" as="p" style="margin-bottom:30px">{{ group.content }}</NpText>
    <NpInlineGrid gap="500" :columns="4" style="margin-bottom:30px">
      <NpUnstyledLink v-for="item in group.items" style="text-decoration:none"
        :url="`/components/${kebabCase(group.title)}/${kebabCase(item.title)}`">
        <NpBlockStack gap="200">
          <NpCard padding="0">
            <div class="ThumbnailPreview"
              style="--pc-box-padding-block-start-xs: var(--p-space-0); --pc-box-padding-block-end-xs: var(--p-space-0); --pc-box-padding-inline-start-xs: var(--p-space-0); --pc-box-padding-inline-end-xs: var(--p-space-0);">
              <img :src="`/assets/images/components/${kebabCase(item.title)}.webp`" sizes="100vw"
                style="position: absolute;height: 100%; width: 100%; inset: 0px; object-fit: cover; color: transparent;" />
            </div>
          </NpCard>

          <h4>{{ formatTitle(item.title) }}</h4>
          <p>{{ item.content }}</p>
        </NpBlockStack>
      </NpUnstyledLink>
    </NpInlineGrid>
  </NpPage>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { NpPage, NpInlineGrid, NpCard, NpText, NpUnstyledLink, NpBlockStack } from "@ncpl/ncpl-polaris";
import { useRouter, useRoute } from "vue-router";
import { components } from "../routes/components";
import { kebabCase, upperFirst, lowerCase } from "lodash";



const router = useRouter();
const route = useRoute();
const group = computed(() => {
  let g = route.path.split('/')[2]
  return components.find(i => kebabCase(i.title) == g)
})

const formatTitle = (title) => {
  return upperFirst(lowerCase(title))
}

</script>
<style scoped>
.ThumbnailPreview {
  aspect-ratio: 16/9;
  border-radius: var(--border-radius-600);
  overflow: hidden;
  background: var(--p-color-bg-surface-secondary-hover);
  position: relative;
  border: 1px solid var(--p-color-border);
}

h4 {
  color: var(--text-strong);
  font-size: var(--font-size-600);
  font-weight: var(--font-weight-700);
  letter-spacing: var(--letter-spacing-200);
  line-height: 1.25;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  color: var(--text-link);
  display: flex;
  align-items: center;
  gap: .5rem;
}

p {
  padding-right: .5rem;
  color: var(--text);
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>