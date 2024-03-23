import type { ResourceListSelectedItems } from "./types"
import type { InjectionKey, UnwrapNestedRefs } from "vue";

export interface ResourceListContextType {
    selectMode?: boolean;
    selectable?: boolean;
    selectedItems?: ResourceListSelectedItems;
    resourceName?: {
        singular: string;
        plural: string;
    };
    loading?: boolean;
    hasBulkActions?: boolean;
    onSelectionChange?(
        selected: boolean,
        id: string,
        sortNumber: number | undefined,
        shiftKey: boolean,
    ): void;
}

export const resourceListContextKey: InjectionKey<UnwrapNestedRefs<ResourceListContextType>> = Symbol('ResourceListContext');