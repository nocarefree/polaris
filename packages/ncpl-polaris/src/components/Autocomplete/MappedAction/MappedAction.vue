<template>
  <div :class="styles.ActionContainer">
    <ListboxAction :selected="active" :disabled="disabled" :value="content || ''">
      <div :class="classNames(
        styles.Action,
        disabled && styles.disabled,
        destructive && styles.destructive,
        active && styles.selected,
      )">
        <div :class="styles.Content">
          <div v-if="$slots.prefix" :class="styles.Prefix">
            <slot name="prefix"></slot>
          </div>
          <div v-else-if="icon" :class="styles.Prefix">
            <Icon :source="icon" />
          </div>
          <div v-else-if="image" role="presentation" :class="styles.Prefix" :style="{ backgroundImage: `url(${image}` }">
          </div>
          <div :class="styles.Text">
            <div :class="wrapOverflow ? styles.ContentWrap : undefined">{{ ellipsis && content
              ? i18n.translate('Polaris.Autocomplete.ellipsis', { content })
              : content }}</div>
            <Text v-if="$slots.helpText" tone="subdued" as="span">
              <slot name="helpText"></slot>
            </Text>
          </div>
          <span v-if="badge" :class="styles.Suffix">
            <Badge :tone="badge.tone">{badge.content}</Badge>
          </span>
          <span v-if="$slots.suffix" :class="styles.Suffix">
            <slot name="suffix"></slot>
          </span>
        </div>
      </div>
    </ListboxAction>
  </div>
</template>
<script setup lang="ts">
import { mappedActionContext } from "./MappedAction"
import styles from './MappedAction.module.scss'
import ListboxAction from '../../Listbox/Action';
import Icon from '../../Icon';
import Text from '../../Text';
import Badge from '../../Badge';
import type { ActionListItemDescriptor } from '../../types';
import { useI18n } from "../../context"
import { classNames } from "../../../utils"

interface MappedAction extends ActionListItemDescriptor {
  wrapOverflow?: boolean;
}

defineOptions({
  name: 'NpAutocompleteMappedAction',
})
const props = defineProps<MappedAction>()

const i18n = useI18n();

mappedActionContext.provide((() => {
  const { role, url, external, onAction, destructive } = props;
  return {
    role,
    url,
    external,
    onAction,
    destructive,
  }
})());


</script>


