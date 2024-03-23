export interface IndexFiltersPrimaryAction {
    type: 'save' | 'save-as' | 'cancel';
    onAction: (name: string, done: () => void) => void;
    disabled?: boolean;
    loading?: boolean;
}

export interface IndexFiltersCancelAction {
    onAction: () => void;
    disabled?: boolean;
    loading?: boolean;
}


export interface UpdateIndexFiltersPrimaryAction
    extends Omit<IndexFiltersPrimaryAction, 'onAction'> {
    onAction: (name: string, done?: () => void) => void;
}


export type IndexFiltersUpdateButtonsProps = {
    primaryAction?: UpdateIndexFiltersPrimaryAction;
    cancelAction: IndexFiltersCancelAction;
    viewNames: string[];
    disabled?: boolean;
}
