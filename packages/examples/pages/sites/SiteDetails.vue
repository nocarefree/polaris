<template>
    <NpPage :title="title" :back-action="backAction">
        <NpContextualSaveBar align-content-flush message="未保存信息" :saveAction="saveAction" :discardAction="discardAction">
        </NpContextualSaveBar>
        <NpForm :auto-complete="false" method="post">
            <NpLayout>
                <NpLayoutSection>
                    <NpLegacyCard sectioned>
                        <NpFormLayout>
                            <NpTextField label="域名" v-model="site.domains" max-height="120" :multiline="4"
                                auto-complete="off"></NpTextField>
                            <NpTextField label="备注" v-model="site.note" auto-complete="off"></NpTextField>
                            <NpTextField label="根目录" placeholder="/www/wwwroot/" v-model="site.path" auto-complete="off">
                            </NpTextField>
                        </NpFormLayout>
                    </NpLegacyCard>
                </NpLayoutSection>
                <NpLayoutSection secondary>
                    <NpLegacyCard sectioned title="模板">
                        <NpSelect label-hidden label="模板" placeholder="请选择模板" v-model="site.template_id"
                            :options="templates">
                        </NpSelect>
                    </NpLegacyCard>
                </NpLayoutSection>
            </NpLayout>
        </NpForm>
    </NpPage>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { NpLayout, NpLayoutSection, NpContextualSaveBar, NpPage, NpLegacyCard, NpTextField, NpText, NpLink, NpSelect, NpFormLayout, NpForm, NpDropZone, NpButton, NpModal, NpLegacyStack } from "@ncpl/ncpl-polaris"
import { useRoute, useRouter } from 'vue-router'
import { useModel } from "./site"

const router = useRouter();
const route = useRoute();

const title = computed(() => route.params.id ? '修改网站' : '添加网站')
const backAction = {
    content: '网站',
    onAction: () => router.push('/sites')
}

const { data: site, dirty } = useModel({
    domains: '',
    note: '',
    path: '',
    template_id: '',
});

watch(() => site.domains, () => {
    let domain = site.domains.split("\n")[0]
    site.path = '/www/wwwroot/' + domain;
})

const templates = []


const saveAction = computed(() => ({
    content: '保存',
    onAction: () => { },
    loading: false,
    disabled: !dirty.value
}))

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