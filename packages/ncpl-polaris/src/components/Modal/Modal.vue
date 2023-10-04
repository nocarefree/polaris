<template>
  <Portal id-prefix="modal">
    <Dialog :open="open" :instant="instant" :labelled-by="headerId" @close="$emit('update:open', false)"
      @entered="$emit('transitionEnd')" @exited="handleExited" :large="large" :small="small" :limit-height="limitHeight"
      :full-screen="fullScreen" @closing="setClosing">
      <Header :title-hidden="titleHidden" :id="headerId" :closing="closing" @close="$emit('update:open', false)">
        <slot v-if="$slots.title" name="footer"></slot><template v-else>{{ title }}</template>
      </Header>
      <iframe v-if="src" name="iFrameName" :title="i18n.translate('Polaris.Modal.iFrameTitle')" :src="src"
        :class="styles.IFrame" @load="handleIFrameLoad" :style="{ height: `${iframeHeight}px` }" />
      <component v-else :is="bodyMarkup">
        <slot></slot>
      </component>

      <Footer v-if="$slots.footer || primaryAction || secondaryActions" :primary-action="primaryAction"
        :secondary-actions="secondaryActions">
        <slot name="footer"></slot>
      </Footer>
    </Dialog>
    <Backdrop v-if="open" @closing="setClosing" @click="$emit('update:open', false)" />
  </Portal>
</template>
<script setup lang="ts">
import { ref, computed, h, useSlots } from 'vue'
import type { ModalProps } from './Modal'
import { useId } from "../context";
import Portal from "@ncpl-polaris/components/Portal"
import Backdrop from "@ncpl-polaris/components/Backdrop"
import Scrollable from "@ncpl-polaris/components/Scrollable"
import HorizontalStack from "@ncpl-polaris/components/HorizontalStack"
import Spinner from "@ncpl-polaris/components/Spinner"
import Box from "@ncpl-polaris/components/Box"
import Header from "./Header"
import Footer from "./Footer"
import Dialog from "./Dialog"
import Section from "./Section"
import styles from './Modal.module.scss'
import { focusFirstFocusableNode } from "@ncpl-polaris/utils/focus"
import { withinContentContext, useI18n } from "../context"

defineOptions({
  name: 'NpModal',
})

const emit = defineEmits(['iframeLoad', 'update:open', 'transitionEnd'])
const props = withDefaults(defineProps<ModalProps>(), { titleHidden: false })

const IFRAME_LOADING_HEIGHT = 200;
const DEFAULT_IFRAME_CONTENT_HEIGHT = 400;

const closing = ref(false);
const headerId = useId();
const iframeHeight = ref(IFRAME_LOADING_HEIGHT);
const i18n = useI18n();
const slots = useSlots();

withinContentContext.provide();


const bodyMarkup = computed(() => {
  const { noScroll, sectioned, loading, titleHidden } = props;

  const content = sectioned
    ? h(Section, { titleHidden }, slots)
    : slots;

  const body = loading ? [h(Box, { padding: "4" }, [
    h(HorizontalStack, { gap: "4", align: "center", blockAlign: "center" }, [
      h(Spinner)
    ])
  ])] : content


  return () => {
    return noScroll ?
      h(Box, { width: "100%", overflowX: "hidden" }, { default: () => body }) :
      h(Scrollable, { shadow: true, class: styles.Body, onScrolledToBottom }, { default: () => body })
  }
})

const onScrolledToBottom = () => {

}

const setClosing = (value: boolean) => {
  closing.value = value;
}

const handleExited = () => {
  const { activator } = props;
  iframeHeight.value = IFRAME_LOADING_HEIGHT;

  if (activator) {
    requestAnimationFrame(() => focusFirstFocusableNode(activator));
  }
}

const handleIFrameLoad = (evt: Event) => {
  const iframe = evt.target as HTMLIFrameElement;
  if (iframe && iframe.contentWindow) {
    try {
      iframeHeight.value = iframe.contentWindow.document.body.scrollHeight;
    } catch (_error) {
      iframeHeight.value = DEFAULT_IFRAME_CONTENT_HEIGHT;
    }
  }

  emit('iframeLoad', evt);
}
</script>
