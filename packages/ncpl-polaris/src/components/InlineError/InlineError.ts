import type { Error } from "../types"
export interface InlineErrorProps {
    /** Content briefly explaining how to resolve the invalid form field input. */
    message: Error;
    /** Unique identifier of the invalid form field that the message describes */
    fieldId: string;
}

export function errorTextID(id: string) {
    return `${id}Error`;
}
