<template>
  <td :class="classNames(
    sharedStyles.TableCell,
    sharedStyles['TableCell-first'],
  )" ref="checkboxNode">
    <div :class="styles.TableCellContentContainer">
      <div :class="wrapperClassName" @click="indexRowValue.onInteraction">
        <Checkbox :id="`Select-${indexRowValue.itemId}`" :label="i18n.translate('Polaris.IndexTable.selectItem', {
          resourceName: indexValue.resourceName.singular,
        })" label-hidden :checked="indexRowValue.selected" :disabled="indexRowValue.disabled" />
      </div>
    </div>
  </td>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import styles from './Checkbox.module.scss'
import sharedStyles from '../IndexTable.module.scss';
import Checkbox from "../../Checkbox"
import { classNames } from '../../../utils'
import { useI18n, useIndexTable, useIndexTableRow } from "../../context"

defineOptions({
  name: 'NpIndexTableCheckbox',
})

const i18n = useI18n();
const indexValue = useIndexTable();
const indexRowValue = useIndexTableRow();
const checkboxNode = ref();

const wrapperClassName = classNames(styles.Wrapper);
</script>
