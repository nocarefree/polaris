import { ref, inject, type Ref } from "vue"

export const ianaTimeZoneKey = Symbol("InjectionKey");

export const useCommon = () => {
    return {
        ianaTimeZone: inject<Ref<string>>(ianaTimeZoneKey, ref('UTC')),
    }
}