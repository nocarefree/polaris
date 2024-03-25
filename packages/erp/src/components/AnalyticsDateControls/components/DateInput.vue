<template>
    <NpTextField :label="i18n?.translate(`AnalyticsDateControls.textFields.${type}TextFieldLabel`)" :label-hidden="true"
        :placeholder="i18n?.translate('AnalyticsDateControls.textFields.placeholderDateValue')" :model-value="showValue"
        @update:modelValue="onChange" @focus="onFocus" @blur="onBlur"></NpTextField>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { NpTextField } from "@ncpl/ncpl-polaris";
import { stringToDate, formatDateTime } from "../../../utils/date-format";
import { useCommon } from "../../context";


function isDateString(t?: string) {
    return t && stringToDate(t) != null
}


const emit = defineEmits(['change'])

const props = defineProps<{
    value?: string;
    type: string;
    shouldDisplayAbbreviatedMonth?: boolean;
    disableDatesAfter?: Date;
}>()

const { i18n, browserTimeZone, locale } = useCommon();
const focused = ref(false)
const dateValue = ref(props.value)
const showValue = computed(() => {
    if (!dateValue.value || focused.value)
        return dateValue.value;
    const u = stringToDate(dateValue.value);
    return u == null ? dateValue.value : formatDateTime(u, locale.value, {
        day: "numeric",
        month: props.shouldDisplayAbbreviatedMonth ? "short" : "long",
        year: "numeric",
        timeZone: browserTimeZone
    })
})

const onFocus = () => {
    focused.value = true;
};

const onBlur = () => {
    dateValue.value = !dateValue.value || !isDateString(dateValue.value) || props.disableDatesAfter && new Date(dateValue.value) > props.disableDatesAfter ? props.value : dateValue.value,
        focused.value = false
};

const onChange = (value: string) => {
    dateValue.value = value;
    isDateString(value) && (props.disableDatesAfter && new Date(value) > props.disableDatesAfter || emit('change', value, props.type))
};

watch(() => props.value, () => {
    dateValue.value = props.value;
})
</script>