import type { Component } from "vue";
import type { Alignment } from "../types"

export type OptionListOptionProps = {
    id: string;
    label: string | Component;
    value: string;
    section: number;
    index: number;
    media?: Component;
    disabled?: boolean;
    active?: boolean;
    select?: boolean;
    allowMultiple?: boolean;
    verticalAlign?: Alignment;
}
