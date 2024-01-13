<template>
  <NpCard padding="0">
    <NpResourceList :resource-name="{ singular: 'blog post', plural: 'blog posts' }" :items="items" selectable
      v-model:selected="selected">
      <template #default="{ item: { id, url, title, author } }">
        <NpResourceItem :id="id" :url="url" :accessibility-label="`View details for ${title}`" :name="title">
          <NpText as="h3" variant="bodyMd" font-weight="bold">
            {{ title }}
          </NpText>
          <div v-if="author">by {{ author }}</div>
        </NpResourceItem>
      </template>
    </NpResourceList>
  </NpCard>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { NpCard, NpResourceList, NpResourceItem, NpText } from "@ncpl/ncpl-polaris";


const items = [
  {
    id: '6',
    url: 'posts/6',
    title: 'How To Get Value From Wireframes',
    author: 'Jonathan Mangrove',
  },
];

const selected = ref([]);

watch(() => selected.value, () => {
  console.log(selected.value)
})


</script>