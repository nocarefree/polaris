<template>
  <td :class="classNames(
    sharedStyles.TableCell,
    sharedStyles['TableCell-first'],
  )" ref="checkboxNode">
    <div :class="styles.TableCellContentContainer">
      <div :class="wrapperClassName" @click="indexRowValue.onInteraction">
        <Checkbox :id="`Select-${indexRowValue.itemId}`" :label="label" label-hidden :checked="indexRowValue.selected"
          :disabled="indexRowValue.disabled" />
      </div>
    </div>
  </td>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import styles from './Checkbox.module.scss'
import sharedStyles from '../IndexTable.module.scss';
import Checkbox from "../../Checkbox"
import { classNames } from '../../../utils'
import { useI18n, useIndexTable, useIndexTableRow } from "../../context";
import { debounce } from "../../../utils/debounce";
import { setRootProperty } from '../../../utils/set-root-property';
import { useEventListener } from "@vueuse/core";


const props = defineProps<{
  accessibilityLabel?: string;
}>()

const i18n = useI18n();
const indexValue = useIndexTable();
const indexRowValue = useIndexTableRow();
const checkboxNode = ref();

const label = computed(() => props.accessibilityLabel
  ? props.accessibilityLabel
  : i18n.value.translate('Polaris.IndexTable.selectItem', {
    resourceName: indexValue.value.resourceName.singular,
  })
)

const wrapperClassName = classNames(styles.Wrapper);


// eslint-disable-next-line react-hooks/exhaustive-deps
const handleResize =
  debounce(() => {
    if (indexRowValue.value.position !== 0 || !checkboxNode.value) return;

    const { width } = checkboxNode.value.getBoundingClientRect();
    setRootProperty('--pc-checkbox-offset', `${width}px`);
  })

useEventListener(window, 'resize', handleResize);

onMounted(() => {
  handleResize();
});

</script>
