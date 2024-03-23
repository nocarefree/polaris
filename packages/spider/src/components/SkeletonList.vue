<template>
  <NpSkeletonPage primary-action>
    <NpLayout>
      <NpLayoutSection>
        <NpCard>
          <NpSkeletonBodyText />
          <NpSkeletonBodyText />
          <NpSkeletonBodyText />
          <NpSkeletonBodyText />
          <NpSkeletonBodyText />
        </NpCard>

      </NpLayoutSection>
    </NpLayout>
  </NpSkeletonPage>
</template>
<script setup lang="ts">
import { NpSkeletonPage, NpLayoutSection, NpSkeletonBodyText, NpLayout, NpCard } from "@ncpl/ncpl-polaris";
</script>