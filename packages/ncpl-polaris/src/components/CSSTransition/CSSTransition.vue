<template>
  <slot v-if="animation"></slot>
</template>
<script setup lang="ts">
import { computed, watch, nextTick, ref, onBeforeUnmount } from "vue";
import type { CSSTransitionProps } from "./CSSTransition"



const props = defineProps<CSSTransitionProps>();
const animation = ref(true)

const timeouts = computed(() => {
  return typeof props.timeout === "object" ? {
    enter: props.timeout.enter || 0,
    leave: props.timeout.exit || 0,
  } : {
    enter: props.timeout,
    leave: props.timeout,
  }
});
let currentId = 0;

const classnames = computed(() => {

  let { classNames = 'fade' } = props;

  let enterFromClass;
  let enterActiveClass;
  let enterToClass;
  let leaveFromClass;
  let leaveActiveClass;
  let leaveToClass;
  let appearFromClass;
  let appearActiveClass;
  let appearToClass;


  if (typeof classNames !== 'string') {
    appearFromClass = classNames.appear;
    appearActiveClass = classNames.appearActive;
    appearToClass = classNames.appearDone;

    enterFromClass = classNames.enter;
    enterActiveClass = classNames.enterActive;
    enterToClass = classNames.enterDone;

    leaveFromClass = classNames.exit;
    leaveActiveClass = classNames.exitActive;
    leaveToClass = classNames.exitDone;
  } else {
    appearFromClass = classNames + '-appear';
    appearActiveClass = classNames + '-active-appear';
    appearToClass = classNames + '-done-appear';

    enterFromClass = classNames + '-enter';
    enterActiveClass = classNames + '-active-enter';
    enterToClass = classNames + '-done-enter';

    leaveFromClass = classNames + '-exit';
    leaveActiveClass = classNames + '-active-exit';
    leaveToClass = classNames + '-done-exit';
  }

  return {
    appearFromClass,
    appearActiveClass,
    appearToClass,
    enterFromClass,
    enterActiveClass,
    enterToClass,
    leaveFromClass,
    leaveActiveClass,
    leaveToClass,
  }
})

function forceReflow() {
  return document.body.offsetHeight;
}


function addClass(el: Element, cls?: string) {
  el && cls && cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
}
function removeClass(el: Element, cls?: string) {
  el && cls && cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
}
const onBeforeEnter = (el: Element) => {
  onLeaveCancelled(el);
  addClass(el, classnames.value.enterFromClass);

  forceReflow();
  onEnter(el);
}

const onEnter = (el: Element) => {
  const id = ++currentId;

  removeClass(el, classnames.value.enterFromClass);
  addClass(el, classnames.value.enterActiveClass);

  setTimeout(() => {
    if (id != currentId) { return };

    onAfterEnter(el)
  }, timeouts.value.enter)
}

const onAfterEnter = (el: Element) => {
  removeClass(el, classnames.value.enterActiveClass)
  addClass(el, classnames.value.enterToClass);
}

const onBeforeLeave = (el: Element) => {
  onEnterCancelled(el);
  addClass(el, classnames.value.leaveFromClass);
  forceReflow();
  onLeave(el);
}

const onLeave = (el: Element) => {

  const id = ++currentId;

  removeClass(el, classnames.value.leaveFromClass)
  addClass(el, classnames.value.leaveActiveClass);

  setTimeout(() => {
    if (id != currentId) { return };

    onAfterLeave(el);
  }, timeouts.value.leave)
}

const onAfterLeave = (el: Element) => {
  removeClass(el, classnames.value.leaveActiveClass);
  addClass(el, classnames.value.leaveToClass);
  if (props.unmountOnExit) {
    animation.value = false;
  }
}

const onEnterCancelled = (el: Element) => {
  removeClass(el, classnames.value.enterFromClass)
  removeClass(el, classnames.value.enterActiveClass)
  removeClass(el, classnames.value.enterToClass)
}

const onLeaveCancelled = (el: Element) => {
  removeClass(el, classnames.value.leaveFromClass)
  removeClass(el, classnames.value.leaveActiveClass)
  removeClass(el, classnames.value.leaveToClass)
}

let _appear: any = null;
const translateFn = () => {
  if (_appear === null) return;
  animation.value = true;
  nextTick(() => {
    let { nodeRef, appear = false } = props;

    if (nodeRef) {
      if (_appear && _appear !== appear) {
        return _appear = false;
      }
      props.in ? onBeforeEnter(nodeRef) : onBeforeLeave(nodeRef);
    }
  })

}

watch(() => props.nodeRef, () => {
  if (_appear === null && props.nodeRef) {
    _appear = true;
    translateFn()
  }
})
watch(() => props.in, translateFn)


onBeforeUnmount(() => {
  currentId++;
});


</script>