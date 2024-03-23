<template>
    <NpButtonGroup>
        <NpButton disabled>Buy shipping label</NpButton>
        <NpButton variant="primary" disabled>
            Buy shipping label
        </NpButton>
        <NpButton tone="critical" disabled>
            Buy shipping label
        </NpButton>
        <span style="{color: '#bf0711'}">
            <NpButton variant="monochromePlain" disabled>
                Buy shipping label
            </NpButton>
        </span>
        <NpButton variant="plain" disabled>
            Buy shipping label
        </NpButton>
        <NpButton variant="plain" tone="critical" disabled>
            Buy shipping label
        </NpButton>
    </NpButtonGroup>
</template>

<script setup lang="ts">
import { NpButtonGroup, NpButton } from "@ncpl/ncpl-polaris";
</script>