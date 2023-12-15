import type { InjectionKey, Ref } from "vue";
import { inject, provide } from "vue";
import type { PopoverProps } from '../Popover';

export type ComboboxProps = {
    /** Allows more than one option to be selected */
    allowMultiple?: boolean;
    /** The preferred direction to open the popover */
    preferredPosition?: PopoverProps['preferredPosition'];
    /** Whether or not more options are available to lazy load when the bottom of the listbox reached. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
    willLoadMoreOptions?: boolean;
    /** Height to set on the Popover Pane. */
    height?: string;
}


export interface ComboboxTextFieldType {
    // Value for the TextField aria-activedescendant. (also on list context when not in combobox)
    activeOptionId: Ref<string | undefined>;
    // Value for the Combobox aria-owns and TextField aria-control
    listboxId: Ref<string | undefined>;
    // Value for aria-expanded on TextField
    expanded: Ref<boolean>;
    // Sets the value for the Listbox aria-labelledby
    setTextFieldLabelId?(id: string): void;
    // Sets a boolean to enable/disable keyboard control for the Listbox
    setTextFieldFocused?(value: boolean): void;
    // Callback fired when TextField is focused
    onTextFieldFocus?(): void;
    // Callback fired when TextField is blurred
    onTextFieldBlur?(): void;
    // Callback fired when TextField value changes
    onTextFieldChange?(value: string): void;
}


export interface ComboboxListboxType {
    // Value of the Texfields ID for listbox aria-labelledby
    textFieldLabelId?: Ref<string | undefined>;
    // Enables/disables keyboard control
    textFieldFocused?: Ref<boolean>;
    // Unique ID to set on the listbox. Used to set the Combobox aria-owns and TextField aria-controls attributes.
    listboxId?: Ref<string | undefined>;
    // Whethor or not more options are available to lazy load. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
    willLoadMoreOptions?: Ref<boolean>;
    // Sets the value for the TextField aria-activedescendant attribute.
    setActiveOptionId?(id: string): void;
    // Callback to set a generated listbox ID.
    setListboxId?(id: string): void;
    // Callback fired when an option is selected.
    onOptionSelected?(): void;
    // Callback fired when keyboard user navigates to the last item. Use to lazy load when listbox option data is paginated.
    onKeyToBottom?(): void;
}

export interface ComboboxListboxOptionType {
    // Whether the option should visually support multiple selection
    allowMultiple?: Ref<boolean>;
}




export const comboboxListboxContextKey: InjectionKey<ComboboxListboxType> = Symbol("comboboxListboxContextKey");

export const comboboxListboxContext = {
    inject: () => {
        return inject(comboboxListboxContextKey, {});
    },
    provide: (value: ComboboxListboxType) => {
        provide(comboboxListboxContextKey, value);
    },
};

export function useComboboxListbox() {
    return comboboxListboxContext.inject();
}

export const comboboxListboxOptionContextKey: InjectionKey<ComboboxListboxOptionType> = Symbol("comboboxListboxOptionContextKey");
export const comboboxListboxOptionContext = {
    inject: () => {
        return inject(comboboxListboxOptionContextKey, {});
    },
    provide: (value: ComboboxListboxOptionType) => {
        provide(comboboxListboxOptionContextKey, value);
    },
};

export function useComboboxListboxOption() {
    return comboboxListboxOptionContext.inject();
}


export const comboboxTextFieldContextKey: InjectionKey<ComboboxTextFieldType> = Symbol("comboboxTextFieldContextKey");
export const comboboxTextFieldContext = {
    inject: () => {
        return inject(comboboxTextFieldContextKey);
    },
    provide: (value: ComboboxTextFieldType) => {
        provide(comboboxTextFieldContextKey, value);
    },
};

export function useComboboxTextField() {
    const context = comboboxTextFieldContext.inject();
    if (!context) {
        throw new Error(
            'No Combobox was provided. Your component must be wrapped in a <Combobox> component.',
        );
    }
    return context;
}