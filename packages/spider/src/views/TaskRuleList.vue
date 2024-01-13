<template>
    <NpContextualSaveBar message="未保存产品" :save-action="{
        onAction: () => console.log('add form submit logic'),
        content: '保存',
        loading: false,
        disabled: false,
    }" :discard-action="{
    content: '取消',
    discardConfirmationModal: true,
    onAction: () => console.log('add clear form logic'),
}" />
    <NpPage v-if="task" :title="task.name" :back-action="{ content: 'Products', url: '/tasks' }">
        <NpForm action="post">
            <NpLayout>
                <NpLayoutSection>

                    <NpLegacyCard title="链接">
                        <div>
                            <NpTextField v-for="(url, index) in task.urls" label="url" label-hidden>
                                <template #connectedLeft>
                                    <NpSelect label-hidden v-model="url.type" :options="webOptions" />
                                </template>
                                <template #connectedRight>
                                    <NpButton :icon="DeleteMinor" @click="onRemoveUrl(index)" />
                                </template>
                            </NpTextField>
                        </div>
                        <div class="CardInnerDivider">
                            <NpDivider />
                        </div>
                        <NpBox padding="400">
                            <NpBlockStack inline-align="start">
                                <NpButton :icon="PlusMinor" variant="plain" @click="onAddUrl">添加链接</NpButton>
                            </NpBlockStack>
                        </NpBox>
                    </NpLegacyCard>

                    <NpLegacyCard title="Headers">
                        <NpFormLayout>
                            <NpTextField v-for="(header, index) in task.headers" label="header" label-hidden
                                v-model="header.value">
                                <template #connectedLeft>
                                    <NpSelect label-hidden v-model="header.key" :options="webOptions" />
                                </template>
                                <template #connectedRight>
                                    <NpButton :icon="DeleteMinor" @click="onRemoveHeader(index)" />
                                </template>
                            </NpTextField>
                        </NpFormLayout>
                        <div class="CardInnerDivider">
                            <NpDivider />
                        </div>
                        <NpBox padding="400">
                            <NpBlockStack inline-align="start">
                                <NpButton :icon="PlusMinor" variant="plain" @click="onAddHeader">添加</NpButton>
                            </NpBlockStack>
                        </NpBox>
                    </NpLegacyCard>
                </NpLayoutSection>

                <NpLayoutSection variant="oneThird">
                    <NpLegacyCard title="线程" sectioned>
                        <NpSelect v-model="task.process" label-hidden label="Date range" :options="processes" />
                    </NpLegacyCard>

                </NpLayoutSection>
                <NpLayoutSection>
                    <NpPageActions :primary-action="{ content: '保存' }" />
                </NpLayoutSection>
            </NpLayout>
        </NpForm>
    </NpPage>
</template>
<script setup lang="ts">
import { ref } from "vue";
import request from "../request";
import { useRoute } from "vue-router";
import { NpPage, NpLayout, NpLayoutSection, NpPageActions, NpContextualSaveBar, NpForm, NpFormLayout, NpTextField, NpLegacyCard, NpSelect, NpDivider, NpBox, NpBlockStack, NpButton } from "@ncpl/ncpl-polaris";
import { PlusMinor, DeleteMinor } from "@ncpl/ncpl-icons";

const router = useRoute();
const task = ref(null)


request.post('/tasks/' + router.params.id).then((data) => {
    task.value = data;
})


const processes = [];
for (let i = 1; i < 10; i++) {
    processes.push({
        value: `${i}`,
        label: `${i}`,
    })
}

const onAction = () => { }

const onRemoveUrl = (index: number) => {
    task.urls = task.urls.splice(index, 1);
}

const onRemoveHeader = (index: number) => {
    task.headers = task.headers.splice(index, 1);
}

const onAddUrl = () => {
    let urls = task.urls
    urls.push({ content: '', type: 'other' });
    task.urls = urls;
}

const onAddHeader = () => {
    let headers = task.headers
    headers.push({ key: '', value: '' });
    task.headers = headers;
}

const webOptions = [{
    label: '产品页',
    value: 'product'
}, {
    label: '相关页',
    value: 'other'
}]

</script>
  
<style lang="scss">
.CardInnerDivider {
    margin-block-start: var(--p-space-400);
}
</style>