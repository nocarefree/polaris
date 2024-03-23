<template>
  <NpText variant="headingMd" as="h2">Heading</NpText>
  <NpText variant="bodySm" as="p">Typography helps establish hierarchy and communicate important content by creating
    clear visual patterns.</NpText>
  <NpCard>
    <NpBlockStack vertical gap="100">
      <NpText variant="heading3xl" as="h2">
        Online store dashboard
      </NpText>
      <NpText variant="heading2xl" as="h3">
        Online store dashboard
      </NpText>
      <NpText variant="headingXl" as="h4">
        Online store dashboard
      </NpText>
      <NpText variant="headingLg" as="h5">
        Online store dashboard
      </NpText>
      <NpText variant="headingMd" as="h6">
        Online store dashboard
      </NpText>
      <NpText variant="headingSm" as="h6">
        Online store dashboard
      </NpText>
    </NpBlockStack>
  </NpCard>

  <NpText variant="headingMd" as="h2">Body</NpText>
  <NpText variant="bodySm" as="p">Use to create a range of body text. These styles are primarily used within
    components and blocks of text.</NpText>
  <NpCard>
    <NpBlockStack vertical gap="100">
      <NpText variant="bodyLg" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </NpText>
      <NpText variant="bodyMd" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </NpText>
      <NpText variant="bodySm" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </NpText>
      <NpText variant="bodyXs" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </NpText>
    </NpBlockStack>
  </NpCard>

  <NpText variant="headingMd" as="h2">Tone</NpText>
  <NpText variant="bodySm" as="p">Use to set text tone (color).</NpText>
  <NpCard>
    <NpBlockStack vertical gap="100">
      <NpText as="p" tone="subdued">
        Use to de-emphasize a piece of text that is less important to merchants
        than other nearby text. May also be used to indicate when normal content
        is absent, for example, “No supplier listed”. Don’t use only for
        aesthetic effect.
      </NpText>
      <NpText as="p" tone="success">
        Use in combination with a symbol showing an increasing value to indicate
        an upward trend.
      </NpText>
      <NpText as="p" tone="caution">
        Use to denote something that needs attention, or that merchants need to
        take action on.
      </NpText>
      <NpText as="p" tone="critical">
        Use in combination with a symbol showing a decreasing value to indicate
        a downward trend.
      </NpText>
    </NpBlockStack>
  </NpCard>

  <NpText variant="headingMd" as="h2">Inheritance & Decoration</NpText>
  <NpText variant="bodySm" as="p">Inherits props from a parent Text container</NpText>
  <NpCard>
    <NpBlockStack vertical gap="100">
      <NpText as="p" variant="heading2xl" tone="caution">
        <NpText as="span">This is a 2xl heading</NpText>
        <br />
        <NpText as="span">This is also a 2xl heading</NpText>
      </NpText>
      <NpText as="p" text-decoration-line="line-through">
        $100.00
      </NpText>
      <NpText as="p" font-weight="bold">
        Sales this year
      </NpText>
      <NpText variant="bodyLg" as="p" alignment="center">
        Manage your Shopify store on-the-go with real-time notifications, access
        to your dashboard, and order management, all from your smartphone.
      </NpText>
    </NpBlockStack>
  </NpCard>
</template>
<script setup lang="ts">
import { NpText, NpPage, NpBlockStack, NpCard } from "@ncpl/ncpl-polaris";

</script>