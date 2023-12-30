<template>
    <aNpPage title="Button" full-width>
        <NpText variant="bodyLg" as="p">
            Buttons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”. Plain buttons, which look
            similar to links, are used for less important or less commonly used actions, such as “view shipping settings”.
        </NpText>

        <ExampleWrapper>
            <ExampleDefault></ExampleDefault>
        </ExampleWrapper>

    </aNpPage>
</template>
<script setup lang="ts">
import ExampleWrapper from "../components/ExampleWrapper.vue";
import ExampleDefault from "./Button/ExampleDefault.vue";
import { NpText, NpPage } from "@ncpl/ncpl-polaris";
</script>