import { type InjectionKey, inject, provide } from "vue";

interface MappedActionContextType {
    role?: string;
    url?: string;
    external?: boolean;
    onAction?(): void;
    destructive?: boolean;
};

export const mappedActionContextKey: InjectionKey<MappedActionContextType> = Symbol('mappedActionContextKey');

export const mappedActionContext = {
    inject() {
        return inject(mappedActionContextKey, {});
    },
    provide(value: MappedActionContextType) {
        provide(mappedActionContextKey, value);
    }
};

export const useMappedAction = () => {
    return mappedActionContext.inject();
}