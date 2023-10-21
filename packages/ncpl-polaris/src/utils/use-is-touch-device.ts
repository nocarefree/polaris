import { ref } from 'vue';

import { useEventListener } from '@vueuse/core';

export function useIsTouchDevice() {
  const isTouchDevice = ref(false);
  useEventListener('touchstart', () => {
    isTouchDevice.value = true
  });
  return isTouchDevice;
}
