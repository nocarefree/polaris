<template>
  <ListboxOption :accessibility-label="typeof label === 'string' ? label : undefined" :key="value" :selected="selected"
    :value="value" :disabled="disabled">
    <ListboxTextOption :selected="selected" :disabled="disabled">
      <div :class="styles.Content">
        <div v-if="$slots.media || media" :class="classNames(
          styles.Media,
          disabled && styles.disabledMedia,
          singleSelection && styles.singleSelectionMedia,
        )">
          <component v-if="media" :is="media"></component>
          <slot v-else name="media"></slot>
        </div>
        <template v-if="label">
          <component :is="()=>label"></component>
        </template>
        <slot v-else name="label"></slot>
      </div>
    </ListboxTextOption>
  </ListboxOption>
</template>
<script setup lang="ts">
import styles from './MappedOption.module.scss'
import type { OptionDescriptor } from '../../types';
import ListboxOption from '../../Listbox/Option';
import ListboxTextOption from '../../Listbox/TextOption';
import { classNames } from '@ncpl-polaris/utils';


type MappedOption = OptionDescriptor & {
  selected: boolean;
  singleSelection: boolean;
};

defineOptions({
  name: 'NpAutocompleteMappedOption',
})
defineProps<MappedOption>()
</script>
