<template>
    <NpButtonGroup style="margin-bottom:5px">
        <NpButton>default</NpButton>
        <NpButton variant="primary">primary</NpButton>
        <NpButton variant="tertiary">tertiary</NpButton>
        <NpButton variant="plain">plain</NpButton>
        <NpButton variant="monochromePlain">monochromePlain</NpButton>
    </NpButtonGroup>

    <NpButtonGroup style="margin-bottom:5px">
        <NpButton tone="success">default</NpButton>
        <NpButton variant="primary" tone="success">primary</NpButton>
        <NpButton variant="tertiary" tone="success">tertiary</NpButton>
        <NpButton variant="plain" tone="success">plain</NpButton>
        <NpButton variant="monochromePlain" tone="success">monochromePlain</NpButton>
    </NpButtonGroup>

    <NpButtonGroup>
        <NpButton tone="critical">default</NpButton>
        <NpButton variant="primary" tone="critical">primary</NpButton>
        <NpButton variant="tertiary" tone="critical">tertiary</NpButton>
        <NpButton variant="plain" tone="critical">plain</NpButton>
        <NpButton variant="monochromePlain" tone="critical">monochromePlain</NpButton>
    </NpButtonGroup>
</template>

<script setup lang="ts">
import { NpButton, NpButtonGroup } from "@ncpl/ncpl-polaris";
</script>