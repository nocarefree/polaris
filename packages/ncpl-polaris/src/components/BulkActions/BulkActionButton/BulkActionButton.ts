import type { DisableableAction } from "../../types"

export type BulkActionButtonProps = {
    disclosure?: boolean;
    indicator?: boolean;
    showContentInButton?: boolean;
} & DisableableAction;
