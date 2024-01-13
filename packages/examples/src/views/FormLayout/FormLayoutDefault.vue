<template>
  <NpCard>
    <NpFormLayout>
      <NpTextField label="Store name" auto-complete="off" />
      <NpTextField type="email" label="Account email" auto-complete="email" />
    </NpFormLayout>
  </NpCard>
</template>
<script setup lang="ts">
import { NpCard, NpFormLayout, NpTextField } from "@ncpl/ncpl-polaris";


</script>