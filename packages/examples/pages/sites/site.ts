import { shallowReactive, watchEffect, ref } from "vue";
import { defineStore } from 'pinia'

interface ModelType {
    [key: string]: any;
};

export function useModel(model: ModelType) {
    const oldModel = JSON.parse(JSON.stringify(model));
    const data = shallowReactive(model)
    const dirty = ref(false)

    watchEffect(() => {
        dirty.value = false;
        for (let i in oldModel) {
            if (oldModel[i] != data[i]) {
                dirty.value = true;
                break;
            }
        }
    })

    return {
        dirty,
        data
    }
}

export const useStore = defineStore('sites', {
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            loading: false,
            resources: null
        }
    },
    actions: {
        loadResources() {
            this.loading = true
            setTimeout(() => {
                this.resources = {
                    total: 5,
                    data: [
                        { id: 1, name: 'test1', path: '/www/wwwroot/test1', note: '', date: '2023-09-27' },
                        { id: 2, name: 'test2', path: '/www/wwwroot/test2', note: '', date: '2023-09-27' },
                        { id: 3, name: 'test3', path: '/www/wwwroot/test3', note: '', date: '2023-09-27' },
                        { id: 4, name: 'test4', path: '/www/wwwroot/test4', note: '', date: '2023-09-27' },
                        { id: 5, name: 'test5', path: '/www/wwwroot/test5', note: '', date: '2023-09-27' },
                    ],
                    current_page: 1,
                    per_page: 30,
                    last_page: 1,
                }
                this.loading = false;
            }, 1500)
        }
    }
})