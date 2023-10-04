<template>
  <Labelled :id="uniqId" :label="labelValue" :action="labelAction" :label-Hidden="labelHiddenValue">
    <div ref="node" :class="classNames(
      styles.DropZone,
      outline && styles.hasOutline,
      focused && styles.focused,
      (active || dragging) && styles.isDragging,
      disabled && styles.isDisabled,
      (internalError || error) && styles.hasError,
      !variableHeight && styles[variationName('size', size)],
      measuring && styles.measuring,
    )" :aria-disabled="disabled" @click="open" @drag-start="stopEvent">
      <component :is="dragOverlay"></component>
      <component :is="dragErrorOverlay"></component>
      <Text variant="bodySm" as="span" visually-hidden>
        <input :id="uniqId" :accept="accept" :disabled="disabled" :multiple="allowMultiple" @change="handleDrop"
          @focus="focused = true" @blur="focused = false" type="file" ref="inputRef" autoComplete="off" />
      </Text>
      <div :class="styles.Container">
        <slot></slot>
      </div>
    </div>
  </Labelled>
</template>
<script setup lang="ts">
import { ref, toRef, computed, h, onMounted, type Component } from 'vue'
import type { DropZoneProps } from './DropZone'
import Labelled from "../Labelled"
import Text from "../Text"
import Icon from "../Icon"
import VerticalStack from "../VerticalStack"
import styles from './DropZone.module.scss'
import { useI18n, useFeatures, useId } from "../context"
import { defaultAllowMultiple, createAllowMultipleKey, getDataTransferFiles, fileAccepted, type DropZoneEvent } from "./utils"
import { capitalize } from "lodash"
import { UploadMajor, CircleAlertMajor } from "@ncpl/ncpl-icons"
import { classNames, variationName } from "@ncpl-polaris/utils"
import { debounce } from "@ncpl-polaris/utils/debounce"
import { useEventListener } from "@vueuse/core"

defineOptions({
  name: 'NpDropZone',
})
const props = withDefaults(defineProps<DropZoneProps>(), {
  allowMultiple: defaultAllowMultiple,
  disabled: false,
  outline: true,
  overlay: true,
  type: 'file'
})
const emit = defineEmits(['click', 'drop', 'dropAccepted', 'dropRejected', 'dragOver', 'dragEnter', 'dragLeave', 'fileDialogClose'])


const { polarisSummerEditions2023 } = useFeatures()
const i18n = useI18n();
const node = ref();
const internalError = ref(false);
const dragging = ref(false);
const inputRef = ref();
const dragTargets = ref<EventTarget[]>([]);
const size = ref('large');
const focused = ref(false);
const measuring = ref(true);
const uniqId = useId(toRef(props, 'id'));
const typeSuffix = computed(() => capitalize(props.type));
const allowMultipleKey = computed(() => createAllowMultipleKey(props.allowMultiple));

const labelValue = computed(() =>
  props.label ||
  i18n.value.translate(`Polaris.DropZone.${allowMultipleKey.value}.label${typeSuffix.value}`))
const labelHiddenValue = computed(() => props.label ? props.labelHidden : true)

const overlayTextWithDefault = computed(() =>
  props.overlayText === undefined
    ? i18n.value.translate(
      `Polaris.DropZone.${allowMultipleKey.value}.overlayText${typeSuffix.value}`,
    )
    : props.overlayText);

const errorOverlayTextWithDefault = computed(() =>
  props.errorOverlayText === undefined
    ? i18n.value.translate(`Polaris.DropZone.errorOverlayText${typeSuffix.value}`)
    : props.errorOverlayText);

const dragOverlay = computed(() =>
  (props.active || dragging.value) &&
  !internalError.value &&
  !props.error &&
  props.overlay &&
  overlayMarkup(UploadMajor, 'interactive', overlayTextWithDefault.value)
);

const dragErrorOverlay = computed(() =>
  dragging.value &&
  (internalError.value || props.error) &&
  overlayMarkup(CircleAlertMajor, 'critical', errorOverlayTextWithDefault.value)
);


function overlayMarkup(
  icon: Component,
  color: 'critical' | 'interactive',
  text: string,
) {
  let iconColor: 'critical' | 'interactive' | undefined = color;
  const summerEditions = {
    critical: 'critical',
    interactive: undefined,
  };
  if (polarisSummerEditions2023) {
    iconColor = summerEditions[color] as
      | 'critical'
      | 'interactive'
      | undefined;
  }
  return h('div', { class: styles.Overlay }, [
    h(VerticalStack, { gap: "2", inlineAlign: "center" }, [
      size.value === 'small' ? h(Icon, { source: icon, color: iconColor }) : null,
      (size.value === 'medium' || size.value === 'large') ? h(Text, { variant: "bodySm", as: "p", fontWeight: "bold" }, { default: () => text }) : null
    ])
  ]);
}

function stopEvent(event: DragEvent | DropZoneEvent) {
  event.preventDefault();
  event.stopPropagation();
}

const getValidatedFiles = (files: File[] | DataTransferItem[]) => {
  const acceptedFiles: File[] = [];
  const rejectedFiles: File[] = [];

  Array.from(files as File[]).forEach((file: File) => {
    !fileAccepted(file, props.accept) ||
      (props.customValidator && !props.customValidator(file))
      ? rejectedFiles.push(file)
      : acceptedFiles.push(file);
  });

  if (!props.allowMultiple) {
    acceptedFiles.splice(1, acceptedFiles.length);
    rejectedFiles.push(...acceptedFiles.slice(1));
  }

  return { files, acceptedFiles, rejectedFiles };
}

const handleDrop = (event: DropZoneEvent) => {
  stopEvent(event);
  if (props.disabled) return;

  const fileList = getDataTransferFiles(event);

  const { files, acceptedFiles, rejectedFiles } = getValidatedFiles(fileList);

  dragTargets.value = [];
  dragging.value = false;
  internalError.value = rejectedFiles.length > 0;

  emit('drop', files as File[], acceptedFiles, rejectedFiles);
  acceptedFiles.length && emit('dropAccepted', acceptedFiles);
  rejectedFiles.length && emit('dropRejected', rejectedFiles);


  if (!(event.target && 'value' in event.target)) return;

  event.target.value = '';
}

const handleDragOver = (event: DropZoneEvent) => {
  stopEvent(event);
  if (props.disabled) return;
  emit('dragOver');
}

const handleDragEnter = (event: DropZoneEvent) => {
  stopEvent(event);
  if (props.disabled) return;

  const fileList = getDataTransferFiles(event);

  if (event.target && !dragTargets.value.includes(event.target)) {
    dragTargets.value.push(event.target);
  }

  if (dragging.value) return;

  const { rejectedFiles } = getValidatedFiles(fileList);

  dragging.value = true;
  internalError.value = rejectedFiles.length > 0;

  emit('dragEnter');
}

const handleDragLeave = (event: DropZoneEvent) => {
  event.preventDefault();

  if (props.disabled) return;

  dragTargets.value = dragTargets.value.filter((el: EventTarget) => {
    const compareNode = props.dropOnPage && window ? document : node.value;

    return el !== event.target && compareNode && compareNode.contains(el);
  });

  if (dragTargets.value.length > 0) return;

  dragging.value = false;
  internalError.value = false;

  emit('dragLeave');
}

const adjustSize = debounce(
  () => {
    if (!node.value) {
      return;
    }
    if (props.variableHeight) {
      measuring.value = false;
      return;
    }

    let _size = 'large';
    const width = node.value.getBoundingClientRect().width;

    if (width < 100) {
      _size = 'small';
    } else if (width < 160) {
      _size = 'medium';
    }

    size.value = _size;
    if (measuring.value) {
      measuring.value = false;
    }
  },
  50,
  { trailing: true },
)

const open = () => {
  if (!inputRef.value) return;
  inputRef.value.click();
};

onMounted(() => {
  adjustSize();
});

useEventListener(node, 'drop', handleDrop);
useEventListener(node, 'dragover', handleDragOver);
useEventListener(node, 'dragenter', handleDragEnter);
useEventListener(node, 'dragleave', handleDragLeave);
useEventListener(window, 'resize', adjustSize);
</script>
