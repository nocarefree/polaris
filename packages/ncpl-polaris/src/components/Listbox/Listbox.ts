import { type InjectionKey, provide, inject } from 'vue';
export type ArrowKeys = 'up' | 'down';

export interface NavigableOption {
    domId: string;
    value: string;
    element: HTMLElement;
    disabled: boolean;
    isAction?: boolean;
    index?: number;
}

export enum AutoSelection {
    /** Default active option is the first selected option. If no options are selected, defaults to first interactive option. */
    FirstSelected = 'FIRST_SELECTED',
    /** Default active option is always the first interactive option. */
    First = 'FIRST',
    /** Default to the manual selection pattern. */
    None = 'NONE',
}

export type ListboxProps = {
    autoSelection?: AutoSelection;
    /** Explicitly enable keyboard control */
    enableKeyboardControl?: boolean;
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** Provide a custom ID for the list element */
    customListId?: string;
}

export interface ListboxContextType {
    onOptionSelect(option: NavigableOption): void;
    setLoading(label?: string): void;
}


export const listboxContextKey: InjectionKey<ListboxContextType> = Symbol("listboxContextKey");

export const listboxContext = {
    provide(value: ListboxContextType) {
        provide(listboxContextKey, value);
    },
    inject() {
        return inject(listboxContextKey);
    }
}

export const useListbox = () => {
    const listbox = listboxContext.inject();

    if (!listbox) {
        throw new Error(
            'No Listbox was provided. Listbox components must be wrapped in a Listbox',
        );
    }
    return listbox;
}


export const withinListboxContextKey: InjectionKey<boolean> = Symbol("withinListboxContextKey");

export const withinListboxContext = {
    provide(value: boolean) {
        provide(withinListboxContextKey, value);
    },
    inject() {
        return inject(withinListboxContextKey, false);
    }
}

export const actionContextKey: InjectionKey<boolean> = Symbol("actionContextKey");

export const actionContext = {
    provide(value: boolean) {
        provide(actionContextKey, value);
    },
    inject() {
        return inject(actionContextKey, false);
    }
}

export const useActionContext = () => {
    return actionContext.inject();
}
