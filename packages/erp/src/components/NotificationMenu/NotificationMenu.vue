<template>
  <NpPopover v-model:active="notifyActive" full-height capture-overscroll fixed preferred-alignment="right">
    <template #activator>
      <div :class="$style.ActivatorWrapper">
        <NpUnstyledButton :class="$style.Activator" @click="notifyActive = !notifyActive">
          <NpIcon :source="NotificationIcon"></NpIcon>
        </NpUnstyledButton>
      </div>
    </template>
    <div :class="$style.MenuPopover">
      <div :class="$style.NotificationsHeading">
        <NpPopoverSection>
          <NpLegacyStack distribution="fill" alignment="center">
            <NpText as="h3" variant="headingMd">提醒</NpText>
            <NpLegacyStack distribution="trailing" spacing="tight">
              <NpUnstyledButton :class="$style.UnreadFilterButton">
                <NpIcon :source="FilterIcon" tone="subdued"></NpIcon>
              </NpUnstyledButton>
              <NpUnstyledButton :class="$style.NotificationHeadingButton">
                <NpIcon :source="CheckCircleIcon" tone="subdued"></NpIcon>
              </NpUnstyledButton>
            </NpLegacyStack>
          </NpLegacyStack>
        </NpPopoverSection>

      </div>
      <div :class="$style.Onboarding">
        <NpLegacyStack vertical alignment-center>
          <p>
            <NpText variant="bodyMd" tone="subdued">关于商店和账户的提醒将显示在此处</NpText>
          </p>
        </NpLegacyStack>
      </div>
    </div>
  </NpPopover>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { NpLegacyStack, NpText, NpPopover, NpPopoverSection, NpUnstyledButton, NpIcon } from "@ncpl/ncpl-polaris";
import { NotificationIcon, CheckCircleIcon, FilterIcon } from "@ncpl/ncpl-icons";

const notifyActive = ref(false)
</script>
<style module>
.ActivatorWrapper {
  height: 3.5rem;
  display: flex;
  align-items: center;
  margin-right: var(--p-space-200)
}

.Activator {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  cursor: pointer
}

.Activator:focus {
  outline: none
}

.Activator {
  position: relative
}

.Activator:after {
  content: "";
  position: absolute;
  z-index: 1;
  top: -.0625rem;
  right: -.0625rem;
  bottom: -.0625rem;
  left: -.0625rem;
  display: block;
  pointer-events: none;
  box-shadow: 0 0 0 -.0625rem var(--p-color-border-focus);
  transition: box-shadow var(--p-motion-duration-100) var(--p-motion-ease);
  border-radius: calc(var(--p-border-radius-100) + .0625rem)
}

.Activator {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  transition: background-color var(--p-motion-duration-100);
  color: var(--p-color-text-inverse);
  padding: var(--p-space-150);
  background-color: var(--p-color-bg-fill-inverse);
  border-radius: var(--p-border-radius-200);
  min-width: auto
}

.Activator:focus-visible:after {
  content: none
}

.Activator:focus-visible {
  outline: var(--p-border-width-050) solid var(--p-color-border-focus);
  outline-offset: var(--p-space-050)
}

.Activator:is(:hover,
  :focus-visible) {
  background-color: var(--p-color-bg-fill-inverse-hover)
}

.Activator:is(:hover,
  :focus-visible) [class*=alerts-feed-unread-count-indicator] {
  border-color: var(--p-color-bg-surface-hover)
}

.Activator:active,
.Activator[aria-expanded=true] {
  background-color: var(--p-color-bg-fill-inverse-active);
  outline: none;
  transition: none;
  color: var(--p-color-text-emphasis)
}

.Activator:active [class*=alerts-feed-unread-count-indicator],
.Activator[aria-expanded=true] [class*=alerts-feed-unread-count-indicator] {
  border-color: var(--p-color-bg-surface-active);
  transition: none
}

.Activator:active svg,
.Activator[aria-expanded=true] svg {
  fill: var(--p-color-icon-inverse)
}

.Activator:active:after,
.Activator[aria-expanded=true]:after {
  border: none
}

.Activator.ActivatorDark:active,
.Activator.ActivatorDark[aria-expanded=true] {
  background-color: var(--pc-top-bar-background-lighter)
}

.Activator.ActivatorDark:active [class*=alerts-feed-unread-count-indicator],
.Activator.ActivatorDark[aria-expanded=true] [class*=alerts-feed-unread-count-indicator] {
  border-color: var(--pc-top-bar-background-lighter)
}

.Activator.ActivatorDark:active svg,
.Activator.ActivatorDark[aria-expanded=true] svg {
  fill: var(--p-color-text-link-inverse)
}

.Activator.ActivatorDark:active,
.Activator.ActivatorDark[aria-expanded=true] {
  color: var(--p-color-text-link-inverse)
}

.Activator.ActivatorDark:is(:hover,
  :focus-visible) {
  background-color: var(--pc-top-bar-background-lighter)
}

.Activator.ActivatorDark:is(:hover,
  :focus-visible) [class*=alerts-feed-unread-count-indicator] {
  border-color: var(--pc-top-bar-background-lighter)
}

@media (max-width: 47.9975em) {
  .Activator {
    background-color: var(--p-color-bg-inverse)
  }

  .Activator:focus,
  .Activator:hover,
  .Activator:active,
  .Activator[aria-expanded=true] {
    background-color: transparent;
    opacity: .85
  }
}

@media (max-width: 64.9975em) {
  .Activator {
    background-color: var(--p-color-bg-inverse)
  }
}

.Onboarding {
  margin: var(--p-space-200) var(--p-space-400) var(--p-space-400);
  padding: var(--p-space-400);
  background-color: var(--p-color-bg-surface-hover);
  border-radius: var(--p-border-radius-050);
  text-align: center
}

.MenuPopover {
  --notification-button-size: 1.75rem;
  --notification-critical-icon-size: 1.25rem;
  --notification-read-indicator-size: .5rem;
  width: 23.75rem;
  max-width: calc(100vw - 2rem)
}

.NotificationsHeading {
  --p-color-icon-secondary: var(--p-color-icon-disabled);
}

.NotificationHeadingButton,
.UnreadFilterButton {
  height: var(--notification-button-size);
  width: var(--notification-button-size);
  padding: 0;
  background: none;
  border: 0;
  border-radius: var(--p-border-radius-100);
  pointer-events: none
}
</style>