<template>
    <NpPage title="模板" full-width>
        <NpLayout>
            <NpLayoutSection>
                <NpLegacyCard sectioned>
                    <NpEmptyState heading="模板将显示在此处" :action="emptyAction"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png">
                        <p>现在还未有任何模板，在使用创建站点之前，请先上传模板。</p>
                    </NpEmptyState>
                </NpLegacyCard>
            </NpLayoutSection>
        </NpLayout>
    </NpPage>
</template>
<script setup>
import { NpEmptyState, NpLayout, NpLayoutSection, NpPage, NpLegacyCard } from "@ncpl/ncpl-polaris"
import { useRouter } from 'vue-router'

const router = useRouter()

const emptyAction = {
    content: '添加模板',
    onAction: () => router.push('/templates/new')
}

</script>