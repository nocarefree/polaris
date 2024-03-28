<template>
  <component :is="as" :class="styles.ShadowBevel" :style="style"
  >
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { ShadowBevelProps } from './ShadowBevel'
import styles from './ShadowBevel.module.scss'
import { getResponsiveValue } from "../../utils/css"
import type { ResponsiveProp } from '../../utils/css';

defineOptions({
  name: 'NpShadowBevel',
})
const props = withDefaults(defineProps<ShadowBevelProps>(), {
  as: 'div',
  bevel: true,
  zIndex: '0',
})

const style = computed(()=>{
  const { zIndex, bevel, boxShadow, borderRadius} = props;
  return {
      '--pc-shadow-bevel-z-index': zIndex,
      ...getResponsiveValue(
        'shadow-bevel', 
        'content', 
        mapResponsiveProp(bevel, (bevel) => (bevel ? '\"\"' : 'none'))
      ),
      ...getResponsiveValue(
        'shadow-bevel', 
        'box-shadow',  
        mapResponsiveProp(bevel, (bevel) => bevel ? `var(--p-shadow-${boxShadow})` : 'none')
      ),
      ...getResponsiveValue(
        'shadow-bevel', 
        'border-radius', 
        mapResponsiveProp(bevel, (bevel) =>   bevel ? `var(--p-border-radius-${borderRadius})` : 'var(--p-border-radius-0)')
      )
    }
})


function mapResponsiveProp(
  responsiveProp: ResponsiveProp<boolean>,
  callback: (value: boolean) => string,
): ResponsiveProp<string> {
  if (typeof responsiveProp === 'boolean') {
    return callback(responsiveProp);
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [
      breakpointsAlias,
      callback(value),
    ]),
  );
}

</script>
