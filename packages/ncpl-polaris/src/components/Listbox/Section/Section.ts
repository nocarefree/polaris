import { inject, provide, ref, type InjectionKey, type Ref } from 'vue';

export const sectionContextKey: InjectionKey<Ref<string | null>> = Symbol('sectionContextKey');

export const sectionContext = {
    provide(value: Ref<string | null>) {
        provide(sectionContextKey, value)
    },
    inject() {
        return inject(sectionContextKey, ref(null));
    }
}

export const useSection = () => {
    return sectionContext.inject();
}