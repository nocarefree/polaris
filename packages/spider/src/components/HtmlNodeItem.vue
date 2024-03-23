<template>
    <div class="node-wrapper">
        <NpCheckbox :checked="checked" @update:checked="onCheckout" :label="text"></NpCheckbox>

        <template v-if="children && children.length > 0">
            <div v-for="(node, index) in children">
                <HtmlNodeItem v-bind="node" :id="`${id}_${index}`"
                    :checked="childrenSelected.indexOf(`${id}_${index}`) > -1" @update:checked="onChildrenCheckout">
                </HtmlNodeItem>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { NpCheckbox } from "@ncpl/ncpl-polaris";

const props = defineProps<{ id: string; text: string; checked: boolean; children?: any[]; }>();
const emit = defineEmits(['update:checked']);

const childrenSelected = ref<string[]>([]);

const onCheckout = (e:boolean) => {
    emit('update:checked', props.id, e);
}

const onChildrenCheckout = (id: string, status: boolean) => {
    if (status) {
        childrenSelected.value = childrenSelected.value.filter(i => i != id);
    } else {
        childrenSelected.value = [...childrenSelected.value, id];
    }

}

</script>

<style>
.node-wrapper {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
}
</style>