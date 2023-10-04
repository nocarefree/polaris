<template>
    <Wrapper v-bind="props">
        <LegacyStack v-if="isNew" :wrap="false" alignment="center">
            <span>{{ title }}</span>
            <Badge status="new">
                {{ i18n.translate('Polaris.IndexTable.onboardingBadgeText') }}
            </Badge>
        </LegacyStack>
        <Text v-else-if="hidden" as="span" visually-hidden>
            {{ title }}
        </Text>
        <template v-else>{{ title }}</template>
    </Wrapper>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { HeaderContentProps } from "./HeaderContent";
import Wrapper from "./Wrapper.vue";
import LegacyStack from "../../LegacyStack";
import Badge from "../../Badge";
import { useI18n } from '../../context';

const props = defineProps<HeaderContentProps>()
const i18n = useI18n();
const isNew = computed(() => props.new)
</script>