import type { DisableableAction } from "../../types";
import type { ButtonProps } from '../../Button';

export type BulkActionButtonProps = {
    disclosure?: boolean;
    indicator?: boolean;
    showContentInButton?: boolean;
    size?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
} & DisableableAction;
