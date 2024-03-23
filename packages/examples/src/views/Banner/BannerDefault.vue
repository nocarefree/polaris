<template>
    <NpBanner title="Order archived" dismissable @dismiss="() => { }">
        <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
    </NpBanner>
</template>

<script setup lang="ts">
import { NpBanner } from "@ncpl/ncpl-polaris";
</script>