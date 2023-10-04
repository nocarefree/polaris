import type { Experimental } from '../types';

export type Size =
    | 'extraSmall'
    | 'small'
    | 'medium'
    | 'large'
    | Experimental<'xl' | '2xl'>;
