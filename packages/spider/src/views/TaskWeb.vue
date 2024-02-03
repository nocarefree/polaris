<template>
  <template v-if="store.firstLoading || !store.map.id">
    <NpSkeletonPage primary-action>
      <NpLayout>
        <NpLayoutSection>
          <NpSkeletonBodyText />
        </NpLayoutSection>
      </NpLayout>
    </NpSkeletonPage>
  </template>
  <template v-else>
    <NpPage :title="webTitle" :back-action="backAction" :secondary-actions="actions">
      <template v-if="store.prevRule?.type == 'shopify_home'" #titleMetadata>
        <NpBadge tone="attention">Shopify</NpBadge>
      </template>
      <NpForm action="post" style="margin-bottom:50px">
        <NpLayout>
          <NpLayoutSection>
            <WebClient />
          </NpLayoutSection>

          <template v-if="store.data.id && (store.data.sended || (store.prevRule && store.rules.length > 0))">
            <template v-if="store.prevRule?.type !== 'product_url'">
              <NpLayoutSection>
                <NpButtonGroup>
                  <NpButton v-for="button in addRulesButtons" @click="onAddRule(button.type)">添加{{ button.content }}规则
                  </NpButton>
                </NpButtonGroup>
              </NpLayoutSection>
              <NpLayoutSection v-for="(rule, index) in store.rules">
                <HtmlUrl v-if="rule.type == 'custom_list_url'" :index="index"></HtmlUrl>
                <HtmlUrlRule v-else :index="index" />
              </NpLayoutSection>
            </template>
            <NpLayoutSection v-else>
              <ProductRules></ProductRules>
            </NpLayoutSection>

          </template>
        </NpLayout>
      </NpForm>
    </NpPage>
  </template>
</template>
<script setup lang="ts">
import {  computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import WebClient from "../components/Task/WebClient.vue";
import HtmlUrlRule from "../components/Task/HtmlUrlRule.vue";
import HtmlUrl from "../components/Task/HtmlUrl.vue";
import ProductRules from "../components/Task/ProductRules.vue";
import { useCurrentTaskWeb } from "../stores"
import { NpSkeletonPage, NpSkeletonBodyText, NpPage, NpLayout, NpLayoutSection, NpBadge, NpForm, NpButton, NpButtonGroup } from "@ncpl/ncpl-polaris";


const router = useRouter();
const route = useRoute();
const store = useCurrentTaskWeb();

watch(() => route.params.id, () => {
  store.get(route.params.id as string);
}, { immediate: true })

const backAction = {
  content: '返回',
  onAction: () => {
    router.back()
  }
}


const webTitle = computed(() => {
  let type = store.prevRule?.type;

  switch (type) {
    case 'home':
      return '初始页分析';
    case 'product_list':
      return '列表页分析';
    case 'product_list_next':
      return '列表下一页分析';
    case 'product_list_more':
      return '更多页分析';
    case 'product_url':
      return '产品页面';
    default:
      return '页面分析';
  }
});

const addRulesButtons = computed(() => {
  let buttons = [];


  if (!store.map || store.map.source_id == '0') {
    buttons.push({
      type: 'custom_list_url',
      content: '指定列表页'
    })
    buttons.push({
      type: 'product_list',
      content: '列表页链接'
    })
  } else if (store.prevRule?.type == 'product_list' || store.prevRule?.type == 'custom_list_url' || store.prevRule?.type == 'product_list_more') {
    buttons.push({
      type: 'product_list_next',
      content: '下一页'
    })
    buttons.push({
      type: 'product_list_more',
      content: '更多页'
    })

    buttons.push({
      type: 'product_url',
      content: '产品链接'
    })
  }

  return buttons;
})

const actions = computed(() => {
  if (!store.map.source_id || store.map.source_id == '0') {
    let data = [];
    if (store.prevRule?.type == 'home' && store.rules.length == 0) {
      data.push({
        content: '标记为Shopify项目',
        onAction: () => onSetRuleType('shopify_home'),
      })
    }

    if (store.prevRule?.type == 'shopify_home' && store.rules.length == 0) {
      data.push({
        content: '标记为普通项目',
        onAction: () => onSetRuleType('home'),
      })
    }
    return data;
  }
  return undefined;
})

const onSetRuleType = (type:string) => {
  store.updateRuleType(type);
}


const processes = [];
for (let i = 1; i < 10; i++) {
  processes.push({
    value: `${i}`,
    label: `${i}`,
  })
}

const onAddRule = (type:string) => {
  store.addRule(type)
}


</script>