<template>
  <li v-bind="sectionAttributes" data-listbox-option :data-listbox-option-action="isAction"
    :data-listbox-option-value="value" :data-listbox-option-destructive="destructive"
    :data-within-section="isWithinSection" :class="classNames(styles.Option, divider && styles.divider)" :id="domId"
    ref="listItemRef" :tabIndex="-1" :role="role || 'option'" :aria-label="accessibilityLabel" :aria-selected="selected"
    :aria-disabled="disabled" @click="(e) => disabled ? undefined : handleOptionSelect(e)"
    @keydown="(e) => disabled ? undefined : handleOptionSelect(e)" @mousedown="handleMouseDown">
    <ConditionalWrapper :condition="Boolean(url)">
      <template #wrapper="{ children }">
        <UnstyledLink :url="url" :external="external">
          <component :is="children"></component>
        </UnstyledLink>
      </template>
      <ConditionalWrapper :condition="isString()">
        <template #wrapper="{ children }">
          <TextOption :selected="selected" :disabled="disabled">
            <component :is="children"></component>
          </TextOption>
        </template>
        <slot></slot>
      </ConditionalWrapper>
    </ConditionalWrapper>
  </li>
</template>
<script setup lang="ts">
import { ref, computed, useSlots, Text } from 'vue';
import type { ListboxOptionProps } from './Option';
import styles from './Option.module.scss';
import ConditionalWrapper from "../../ConditionalWrapper";
import { useActionContext, useListbox } from "../../Listbox";
import { useMappedAction } from "../../Autocomplete";
import { useId } from "../../context";
import { useSection, listboxWithinSectionDataSelector } from "../Section";
import TextOption from "../TextOption";
import UnstyledLink from "../../UnstyledLink";
import { classNames } from "@ncpl-polaris/utils";


defineOptions({
  name: 'NpListboxOption',
})
const props = defineProps<ListboxOptionProps>()
const slots = useSlots();
const isString = () => {
  const children = slots.default?.();
  return children && children.length < 2 && children[0].type == Text;
}

const domId = useId();
const { onOptionSelect } = useListbox();
const isAction = useActionContext();
const { role, url, external, onAction, destructive } = useMappedAction();
const sectionId = useSection();

const listItemRef = ref<HTMLLIElement>();
const isWithinSection = computed(() => Boolean(sectionId?.value));

const sectionAttributes = computed(() => {
  return {
    [listboxWithinSectionDataSelector.attribute]: isWithinSection.value,
  }
});

const handleOptionSelect = (event: MouseEvent | KeyboardEvent) => {
  event.preventDefault();
  event.stopPropagation();
  onAction && onAction();
  if (listItemRef.value && !onAction) {
    onOptionSelect({
      domId: domId.value,
      value: props.value,
      element: listItemRef.value,
      disabled: props.disabled,
    });
  }
};

const handleMouseDown = (event: MouseEvent) => {
  event.preventDefault();
};

</script>
