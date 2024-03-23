import type { Component } from "vue";
import type { DisableableAction } from "../../types"

export interface LegacyCardHeaderProps {
    title?: string | Component,
    actions?: DisableableAction[];
}
