import type { ModalProps } from '../../Modal';

export type TabsCreateViewModalProps = {
    open: boolean;
    activator?: ModalProps['activator'];
    viewNames: string[];
}
