type SortValue = `${string} ${'asc' | 'desc'}`;


export interface SortButtonChoice {
    label: string;
    disabled?: boolean;
    value: SortValue;
    directionLabel: string;
}


export enum SortButtonDirection {
    Asc = 'asc',
    Desc = 'desc',
}

import type { ChoiceListProps } from '../../ChoiceList';

export type IndexFiltersSortButtonProps = {
    choices: SortButtonChoice[];
    selected: ChoiceListProps['selected'];
    disabled?: boolean;
}
