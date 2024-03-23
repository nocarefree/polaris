<template>
  <NpCard padding="0">
    <NpResourceList :resource-name="{ singular: 'blog post', plural: 'blog posts' }" :items="items">
      <template #default="{ item: { id, url, name, avatarSource, lastOrder, location } }">
        <NpResourceItem vertical-alignment="center" :id="id" :url="url" :accessibility-label="`View details for ${name}`"
          :name="name">
          <template #media>
            <NpAvatar customer size="md" :name="name" :source="avatarSource" />
          </template>
          <NpText as="h3" variant="bodyMd" font-weight="bold">
            {{ name }}
          </NpText>
          <div>{{ location }}</div>
          <div>{{ lastOrder }}</div>
        </NpResourceItem>
      </template>
    </NpResourceList>
  </NpCard>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { NpCard, NpResourceList, NpResourceItem, NpText, NpAvatar } from "@ncpl/ncpl-polaris";


const items = [
  {
    id: '145',
    url: '#',
    avatarSource:
      'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
    name: 'Yi So-Yeon',
    location: 'Gwangju, South Korea',
    lastOrder: 'Emerald Silk Gown',
  },
];



</script>