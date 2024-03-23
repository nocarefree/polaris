<template>
  <Menu :open="open" @open="$emit('update:open', !open)" @close="$emit('update:open', !open)" :actions="actions"
    :message="message" :accessibility-label="accessibilityLabel" :custom-width="customWidth" user-menu>
    <template #activatorContent>
      <slot v-if="$slots.customActivator" name="customActivator"></slot>
      <template v-else>
        <span :class="styles.Details">
          <Text as="p" alignment="start" font-weight="medium" truncate>
            {{ name }}
          </Text>
          <span :class="styles.Message">
            <Text as="p" variant="bodySm" alignment="start" tone="subdued" truncate>
              {{ detail }}
            </Text>
          </span>
        </span>
        <MessageIndicator :active="Boolean(message)">
          <Avatar size="md" :initials="initials && initials.replace(' ', '')" :source="avatar" :name="name" />
        </MessageIndicator>
      </template>
    </template>
  </Menu>
</template>
<script setup lang="ts">
import { UserMenuProps } from './UserMenu'
import Menu from '../Menu'
import MessageIndicator from '@ncpl-polaris/components/MessageIndicator'
import Avatar from '@ncpl-polaris/components/Avatar'
import Text from '@ncpl-polaris/components/Text'
import styles from './UserMenu.module.scss'

defineOptions({
  name: 'NpUserMenu',
})
defineProps<UserMenuProps>()

defineEmits(['update:open']);
</script>
