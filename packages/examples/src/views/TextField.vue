<template>
  <ExampleWrapper height="220">
    <TextFieldDefault></TextFieldDefault>
  </ExampleWrapper>
  <ComponentApiList :apis="apis" />
</template>
<script setup lang="ts">
import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"

import ExampleWrapper from "../components/ExampleWrapper.vue";
import TextFieldDefault from "./TextField/TextFieldDefault.vue";

const apis = [{
  label: 'Props',
  types: [
    { name: "modelValue", type: "string", description: "Initial value for the input.", defaultValue: '' },
    { name: "label", type: "string", description: "Label for the input." },
    { name: "placeholder", type: "string", description: "Hint text to display." },
    { name: "labelAction", type: "LabelledProps['action']", description: "Adds an action to the label." },
    { name: "labelHidden", type: "boolean", description: "Visually hide the label." },
    { name: "disabled", type: "boolean", description: "Disable the input." },
    { name: "clearButton", type: "boolean", description: "Show a clear text button in the input." },
    { name: "selectTextOnFocus", type: "boolean", description: "Indicates whether or not the entire value should be selected on focus.." },
    { name: "suggestion", type: "string", description: "An inline autocomplete suggestion containing the input value. The characters that complete the input value are selected for ease of deletion on input change or keypress of Backspace/Delete. The selected substring is visually highlighted with subdued styling.." },
    { name: "readOnly", type: "boolean", description: "Disable editing of the input." },
    { name: "autoFocus", type: "boolean", description: "Automatically focus the input." },
    { name: "focused", type: "boolean", description: "Force the focus state on the input." },
    { name: "multiline", type: "boolean | number", description: "Allow for multiple lines of input." },
    { name: "error", type: "Error | boolean", description: "Error to display beneath the label." },
    { name: "type", type: "'text' | 'email' | 'number' | 'integer' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local'| 'month' | 'time' | 'week' | 'currency'", description: "Determine type of input.", defaultValue: 'type' },
    { name: "name", type: "string", description: "Name of the input." },
    { name: "id", type: "string", description: "ID for the input." },
    { name: "role", type: "string", description: "Defines a specific role attribute for the input." },
    { name: "step", type: "number", description: "Limit increment value for numeric and date-time inputs." },
    { name: "largeStep", type: "number", description: "Increment value for numeric and date-time inputs when using Page Up or Page Down." },
    { name: "autoComplete", type: "string", description: 'Enable automatic completion by the browser. Set to "off"when you do not want the browser to fill in info.' },
    { name: "max", type: "number | string", description: "Mimics the behavior of the native HTML attribute, limiting the maximum value." },
    { name: "maxLength", type: "number", description: "Maximum character length for an input." },
    { name: "maxHeight", type: "number | string", description: "Maximum height of the input element. Only applies when `multiline` is `true`." },
    { name: "min", type: "number | string", description: "Mimics the behavior of the native HTML attribute, limiting the minimum value." },
    { name: "minLength", type: "number", description: "Minimum character length for an input." },
    { name: "pattern", type: "string", description: "A regular expression to check the value against." },
    { name: "inputMode", type: "'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'", description: "Choose the keyboard that should be used on mobile devices." },
    { name: "spellCheck", type: "boolean", description: "Indicate whether value should have spelling checked." },
    { name: "ariaOwns", type: "string", description: "Indicates the id of a component owned by the input." },
    { name: "ariaExpanded", type: "boolean", description: "Indicates whether or not a Popover is displayed." },
    { name: "ariaControls", type: "string", description: "Indicates the id of a component controlled by the input." },
    { name: "ariaActiveDescendant", type: "string", description: "Indicates the id of a related component’s visually focused element to the input." },
    { name: "ariaAutocomplete", type: "string", description: "Indicates what kind of user input completion suggestions are provided." },
    { name: "showCharacterCount", type: "boolean", description: "Indicates whether or not the character count should be displayed." },
    { name: "align", type: "'left' | 'center' | 'right'", description: "Determines the alignment of the text in the input." },
    { name: "requiredIndicator", type: "boolean", description: "Visual required indicator, adds an asterisk to label." },
    { name: "monospaced", type: "boolean", description: "Indicates whether or not a monospaced font should be used." },
    { name: "variant", type: "'inherit' | 'borderless'", description: "Indicates whether or not a monospaced font should be used ", defaultValue: 'inherit' },
  ]
}, {
  label: 'Slots',
  types: [
    { name: "prefix", description: "Text to display before value." },
    { name: "suffix", description: "Text to display after value." },
    { name: "verticalContent", description: "Content to vertically display above the input value." },
    { name: "helpText", description: "Additional hint text to display." },
    { name: "label", description: "Label for the input." },
    { name: "connectedRight", description: "An element connected to the right of the input." },
    { name: "connectedLeft", description: "An element connected to the left of the input." },
  ]
}, {
  label: 'Event',
  types: [
    { name: 'update:model-value', fun: '(value: string) =>void' },
    { name: 'focus', fun: '(event: Event) =>void' },
    { name: 'blur', fun: '(event: Event) =>void' },
    { name: 'compositionstart', fun: '(event: Event) =>void' },
    { name: 'compositionupdate', fun: '(event: Event) =>void' },
    { name: 'compositionend', fun: '(event: Event) =>void' },
    { name: 'input', fun: '(event: Event) =>void' },
    { name: 'change', fun: '(event: Event) =>void' },
    { name: 'clear', fun: '() =>void' },
  ]
}] as ComponentApiType[];

</script>