<template>
    <NpPage :title="title" :back-action="backAction">
        <NpContextualSaveBar align-content-flush message="未保存信息" :saveAction="saveAction" :discardAction="discardAction">
        </NpContextualSaveBar>
        <NpForm :auto-complete="false" method="post">
            <NpLayout>
                <NpLayoutSection>
                    <NpLegacyCard sectioned>
                        <NpFormLayout>
                            <NpTextField label="标题" v-model="template.name" auto-complete="off"></NpTextField>
                            <NpTextField label="描述" v-model="template.description" auto-complete="off"></NpTextField>
                        </NpFormLayout>
                    </NpLegacyCard>
                    <NpLegacyCard sectioned title="文件">
                        <NpDropZone outline>
                            <div class="nGcDV">
                                <div class="MsoaY">
                                    <NpButton>上传新文件</NpButton>
                                    <div class="eV1Lc">
                                        <NpLink monochrome remove-underline @click="openUrlModal">从 URL 添加</NpLink>
                                    </div>
                                </div>
                                <div>
                                    <NpText variant="bodySm" as="p" color="subdued">接受Tar、Zip、Rar、7Z等压缩文件</NpText>
                                </div>
                            </div>
                        </NpDropZone>
                    </NpLegacyCard>
                    <NpLegacyCard sectioned title="数据库">
                        <NpDropZone outline>
                            <div class="nGcDV">
                                <div class="MsoaY">
                                    <NpButton>上传新文件</NpButton>
                                    <div class="eV1Lc" :ref="(e: any) => fileModal.activator = e">
                                        <NpLink monochrome remove-underline @click="openUrlModal">从
                                            URL 添加
                                        </NpLink>
                                    </div>
                                </div>
                                <div>
                                    <NpText variant="bodySm" as="p" color="subdued">接受Sql、Zip、Tar等压缩数据文件</NpText>
                                </div>
                            </div>
                        </NpDropZone>
                    </NpLegacyCard>
                </NpLayoutSection>
                <NpLayoutSection secondary>
                    <NpLegacyCard sectioned title="状态">
                        <NpSelect label-hidden label="状态" v-model="template.status" :options="templateStatus">
                        </NpSelect>
                    </NpLegacyCard>
                </NpLayoutSection>
            </NpLayout>
        </NpForm>
    </NpPage>
    <NpModal title="从 URL 添加文件" sectioned v-model:open="fileModal.open" :activator="fileModal.activator" :primary-action="{
        content: '添加文件',
        onAction: async () => { },
        disabled: true,
        loading: false,
    }
        " :secondary-actions="[{
        content: '取消',
        onAction: () => { }
    }]
        ">
        <NpLegacyStack vertical wrap>
            <NpTextField label="可下载用URL" v-model="fileModal.url" auto-complete="off" placeholder="https://"></NpTextField>
        </NpLegacyStack>
    </NpModal>
</template>
<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { NpLayout, NpLayoutSection, NpContextualSaveBar, NpPage, NpLegacyCard, NpTextField, NpText, NpLink, NpSelect, NpFormLayout, NpForm, NpDropZone, NpButton, NpModal, NpLegacyStack } from "@ncpl/ncpl-polaris"
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();
const route = useRoute();

const title = computed(() => route.params.id ? '修改模板' : '添加模板')
const backAction = {
    content: '模板',
    onAction: () => router.push('/templates')
}

const template = {
    name: '',
    description: '',
    status: 'ACTIVE'
}

const templateStatus = [
    { label: '活跃', value: 'ACTIVE' },
    { label: '草稿', value: 'DRAFT' },
]

const fileModal = reactive<{
    activator: any,
    open: boolean,
    url: string,
}>({
    activator: null,
    open: false,
    url: '',
});

const openUrlModal = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    fileModal.open = true;
}

const saveAction = ref({
    content: '保存',
    onAction: () => { },
    loading: false,
    disabled: false
})

const discardAction = ref({
    content: '取消',
    onAction: () => { router.back() }
})
</script>
<style>
.nGcDV {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: var(--p-space-100);
    height: 100%;
    justify-content: center;
    position: relative;
}

.MsoaY {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--p-space-300);
    justify-content: center;
}

.MsoaY,
.dn_ht {
    font-size: var(--p-font-size-75);
    font-weight: var(--p-font-weight-semibold);
}

.eV1Lc {
    flex: 1 1 auto;
    position: relative;
    text-align: center;
}
</style>