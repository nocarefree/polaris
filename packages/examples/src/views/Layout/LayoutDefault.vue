<template>
  <NpLayout>
    <NpLayoutSection variant="oneThird">
      <NpLegacyCard title="Florida" :actions="[{ content: 'Manage' }]">
        <NpLegacyCardSection>
          <NpText tone="subdued" as="span">
            455 units available
          </NpText>
        </NpLegacyCardSection>
        <NpLegacyCardSection title="Items">
          <NpResourceList :resource-name="{ singular: 'product', plural: 'products' }" :items="[
            { id: '343', url: '#', name: 'Black & orange scarf', sku: '9234194023', quantity: '254', media: 'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg' },
            { id: '258', url: '#', name: 'Tucan scarf', sku: '9234194010', quantity: '201', media: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg' }
          ]">
            <template #default="{ item: { id, url, name, sku, media, quantity } }">
              <NpResourceItem :id="id" :url="url" :media="media" :accessibility-label="`View details for ${name}`">
                <template #media>
                  <NpThumbnail :source="media" :alt="name" />
                </template>
                <NpText variant="bodyMd" font-weight="bold" as="h3">
                  {{ name }}
                </NpText>
                <div>SKU: {{ sku }}</div>
                <div>{{ quantity }} available</div>
              </NpResourceItem>
            </template>
          </NpResourceList>
        </NpLegacyCardSection>
      </NpLegacyCard>
    </NpLayoutSection>
    <NpLayoutSection variant="oneThird">
      <NpLegacyCard title="Nevada" :actions="[{ content: 'Manage' }]">
        <NpLegacyCardSection>
          <NpText tone="subdued" as="span">
            301 units available
          </NpText>
        </NpLegacyCardSection>
        <NpLegacyCardSection title="Items">
          <NpResourceList :resource-name="{ singular: 'product', plural: 'products' }" :items="[
            { id: '345', url: '#', name: 'Black & orange scarf', sku: '9234194023', quantity: '100', media: 'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg' },
            { id: '260', url: '#', name: 'Tucan scarf', sku: '9234194010', quantity: '201', media: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg' }
          ]">
            <template #default="{ item: { id, url, name, sku, media, quantity } }">
              <NpResourceItem :id="id" :url="url" :media="media" :accessibility-label="`View details for ${name}`">
                <template #media>
                  <NpThumbnail :source="media" :alt="name" />
                </template>
                <NpText variant="bodyMd" font-weight="bold" as="h3">
                  {{ name }}
                </NpText>
                <div>SKU: {{ sku }}</div>
                <div>{{ quantity }} available</div>
              </NpResourceItem>
            </template>
          </NpResourceList>
        </NpLegacyCardSection>
      </NpLegacyCard>
    </NpLayoutSection>
    <NpLayoutSection variant="oneThird">
      <NpLegacyCard title="Minneapolis" :actions="[{ content: 'Manage' }]">
        <NpLegacyCardSection>
          <NpText tone="subdued" as="span">
            1931 units available
          </NpText>
        </NpLegacyCardSection>
        <NpLegacyCardSection title="Items">
          <NpResourceList :resource-name="{ singular: 'product', plural: 'products' }" :items="[
            { id: '344', url: '#', name: 'Black & orange scarf', sku: '9234194023', quantity: '1230', media: 'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg' },
            { id: '259', url: '#', name: 'Tucan scarf', sku: '9234194010', quantity: '701', media: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg' }
          ]">
            <template #default="{ item: { id, url, name, sku, media, quantity } }">
              <NpResourceItem :id="id" :url="url" :media="media" :accessibility-label="`View details for ${name}`">
                <template #media>
                  <NpThumbnail :source="media" :alt="name" />
                </template>
                <NpText variant="bodyMd" font-weight="bold" as="h3">
                  {{ name }}
                </NpText>
                <div>SKU: {{ sku }}</div>
                <div>{{ quantity }} available</div>
              </NpResourceItem>
            </template>
          </NpResourceList>
        </NpLegacyCardSection>
      </NpLegacyCard>
    </NpLayoutSection>
  </NpLayout>
</template>
<script setup lang="ts">
import { NpLayout, NpLayoutSection, NpLegacyCard, NpLegacyCardSection, NpResourceList, NpResourceItem, NpText, NpThumbnail } from "@ncpl/ncpl-polaris";
</script>