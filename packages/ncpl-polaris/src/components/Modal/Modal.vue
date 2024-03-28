<template>
  <Portal id-prefix="modal">
    <Dialog :open="open" :instant="instant" :labelled-by="headerId" @close="onClose" @entered="$emit('transitionEnd')"
      @exited="handleExited" :large="large" :small="small" :limit-height="limitHeight" :full-screen="fullScreen"
      @closing="setClosing">
      <Header :title-hidden="titleHidden" :id="headerId" :closing="closing" @close="onClose">
        <slot v-if="$slots.title" name="footer"></slot><template v-else>{{ title }}</template>
      </Header>
      <iframe v-if="src" name="iFrameName" :title="i18n.translate('Polaris.Modal.iFrameTitle')" :src="src"
        :class="styles.IFrame" @load="handleIFrameLoad" :style="{ height: `${iframeHeight}px` }" />

      <component v-else :is="noScroll?Box:Scrollable" v-bind="bodyAttributes">
        <ConditionalWrapper :is="sectioned">
          <Box v-if="loading" padding="400">
            <InlineStack gap="400" align="center" block-align="center">
              <Spinner></Spinner>
            </InlineStack>
          </Box>
          <slot v-else></slot>

          <template #wrapper="{ children }">
            <Section :title-hidden="titleHidden">
              <component :is="children"></component>
            </Section>
          </template>
        </ConditionalWrapper>
      </component>

      <Footer v-if="$slots.footer || primaryAction || secondaryActions" :primary-action="primaryAction"
        :secondary-actions="secondaryActions">
        <slot name="footer"></slot>
      </Footer>
    </Dialog>
    <Backdrop v-if="open" @closing="setClosing" @click="onClose" />
  </Portal>
  <slot name="activator"></slot>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ModalProps } from './Modal';
import { useId } from "../context";
import Portal from "../Portal";
import Backdrop from "../Backdrop";
import Scrollable from "../Scrollable";
import InlineStack from "../InlineStack";
import Spinner from "../Spinner";
import Box from "../Box";
import Header from "./Header";
import Footer from "./Footer";
import Dialog from "./Dialog";
import ConditionalWrapper from "../ConditionalWrapper";
import Section from "./Section";
import styles from './Modal.module.scss';
import { focusFirstFocusableNode } from "../../utils/focus";
import { withinContentContext, useI18n } from "../context";

defineOptions({
  name: 'NpModal',
})

const emit = defineEmits(['iframeLoad', 'close', 'update:open', 'transitionEnd'])
const props = withDefaults(defineProps<ModalProps>(), { titleHidden: false })

const IFRAME_LOADING_HEIGHT = 200;
const DEFAULT_IFRAME_CONTENT_HEIGHT = 400;

const closing = ref(false);
const headerId = useId();
const iframeHeight = ref(IFRAME_LOADING_HEIGHT);
const i18n = useI18n();

withinContentContext.provide();

const bodyAttributes = computed(() => (props.noScroll ? { width: "100%", overflowX: "hidden" } : { shadow: true, class: styles.Body, onScrolledToBottom }));

const onClose = () => {
  emit('close');
  emit('update:open', false);
}

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
