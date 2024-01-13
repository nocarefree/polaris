<template>
  <NpCard padding="0">
    <NpResourceList :resource-name="{ singular: 'blog post', plural: 'blog posts' }" :items="items" selectable
      v-model:selected="selected">
      <template #default="{ item: { id, url, name, avatarSource, shortcutActions, location } }">
        <NpResourceItem :id="id" :url="url" :accessibility-label="`View details for ${name}`" :name="name"
          :shortcut-actions="shortcutActions">
          <template #media>
            <NpAvatar customer size="md" :name="name" :source="avatarSource" />
          </template>
          <NpText as="h3" variant="bodyMd" font-weight="bold">
            {{ name }}
          </NpText>
          <div>{{ location }}</div>
        </NpResourceItem>
      </template>
    </NpResourceList>

  </NpCard>
  <br>
  <NpCard padding="0">

    <NpResourceList :resource-name="{ singular: 'blog post', plural: 'blog posts' }" :items="items">
      <template #default="{ item: { id, url, name, avatarSource, shortcutActions, location } }">
        <NpResourceItem :id="id" :url="url" :accessibility-label="`View details for ${name}`" :name="name"
          :shortcut-actions="shortcutActions" persist-actions>
          <template #media>
            <NpAvatar customer size="md" :name="name" :source="avatarSource" />
          </template>
          <NpText as="h3" variant="bodyMd" font-weight="bold">
            {{ name }}
          </NpText>
          <div>{{ location }}</div>
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
    latestOrderUrl: '#',
    shortcutActions: [{ content: 'View latest order', url: '#', accessibilityLabel: `View Yi So-Yeon’s latest order` }]
  },
];

const selected = ref([]);

watch(() => selected.value, () => {
  console.log(selected.value)
})


</script>