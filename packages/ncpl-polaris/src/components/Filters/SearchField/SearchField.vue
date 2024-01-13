<template>
  <TextField :id="id" :model-value="modelValue" @update:modelValue="(e: string) => $emit('update:modelValue', e)"
    @focus="e => $emit('focus', e)" @blur="e => $emit('blur', e)" @clear="$emit('clear')" auto-complete="off"
    :placeholder="placeholder" :disabled="disabled" :variant="borderlessQueryField ? 'borderless' : 'inherit'" size="slim"
    :focused="focused" :label="placeholder || ''" label-hidden clear-button>
    <template v-if="mdUp" #prefix>
      <Icon :source="SearchMinor" />
    </template>
    <template v-if="loading" #suffix>
      <div :className="styles.Spinner">
        <Spinner size="small" />
      </div>
    </template>
  </TextField>
</template>

<script setup lang="ts">
import type { FiltersSearchFieldProps } from './SearchField';
import TextField from "../../TextField";
import styles from './SearchField.module.scss';
import Spinner from "../../Spinner";
import Icon from "../../Icon";
import { useId, useBreakpoints } from "../../context";
import { SearchMinor } from "@ncpl/ncpl-icons";

defineOptions({
  name: 'NpFiltersSearchField',
})
defineProps<FiltersSearchFieldProps>()
defineEmits(['focus', 'blur', 'clear', 'update:modelValue', 'change']);

const id = useId();
const { mdUp } = useBreakpoints();


</script>
