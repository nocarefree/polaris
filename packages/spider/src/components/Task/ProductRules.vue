<template>
  <NpTabs :tabs="tabs" :disabled="store.loading" v-model:selected="selectedIndex" />

  <NpBlockStack gap="200">

    <template v-if="selectedTab.id == 'attributes'">
      <NpInlineStack gap="200" block-align="start" align="center">
        <NpBlockStack v-if="selecteRules.length" gap="200" style="flex:3">
          <ProductRuleItem v-for="rule in selecteRules" :title="rule.title" :index="rule.index">
          </ProductRuleItem>
        </NpBlockStack>
        <NpLegacyCard style="flex:1" title="新增属性" sectioned
          :primary-footer-action="{ content: '添加', onAction: onAddNewAttribute, disabled: !Boolean(newAttribute) }">
          <NpTextField label="" label-hidden placeholder="填写属性名" v-model="newAttribute"></NpTextField>
        </NpLegacyCard>
      </NpInlineStack>
    </template>

    <template v-else>
      <ProductRuleItem v-for="rule in selecteRules" :title="rule.title" :index="rule.index">
      </ProductRuleItem>
    </template>

    <NpLegacyCard>
      <NpIndexTable :resource-name="{ singular: '产品内容', plural: '产品内容' }" :loading="store.productLoading"
        :headings="[{ title: '键' }, { title: '值' },]" :rows="touchProducts" :selectable="false">
        <template #default="{ index, row }">
          <NpIndexTableRow :id="row.id" :position="index">
            <NpIndexTableCell>{{ row.key }}</NpIndexTableCell>
            <NpIndexTableCell>{{ row.value }}</NpIndexTableCell>
          </NpIndexTableRow>
        </template>
      </NpIndexTable>
    </NpLegacyCard>
  </NpBlockStack>
</template>
<script setup lang="ts">
import { computed, watch } from "vue";
import { ref } from "vue";
import ProductRuleItem from "./ProductRuleItem.vue";
import { NpTabs, NpBlockStack, NpLegacyCard, NpIndexTable, NpIndexTableRow, NpIndexTableCell, NpTextField, NpInlineStack } from "@ncpl/ncpl-polaris";
import { useCurrentTaskWeb } from "../../stores";

const store = useCurrentTaskWeb();
const newAttribute = ref('');

store.touchProduct();

const tabs = [
  { id: 'name', content: '标题' },
  { id: 'sku', content: 'SKU' },
  { id: 'category', content: '分类' },
  { id: 'brand', content: '品牌' },
  { id: 'shor_decription', content: '简介' },
  { id: 'decription', content: '描述' },
  { id: 'price', content: '现价' },
  { id: 'compare_at_price', content: '原价' },
  { id: 'images', content: '图片链接' },
  { id: 'attributes', content: '属性' },
]

const selectedIndex = ref(0);
const selectedTab = computed(() => {
  return tabs[selectedIndex.value];
})

watch(() => store.rules, () => {
  for (let tab of tabs) {
    if (store.rules.filter(r => r.type == `product_content_${tab.id}`).length == 0 && tab.id != 'attributes') {
      store.addRule(`product_content_${tab.id}`, 'substr');
    }
  }
}, { immediate: true })

const selecteRules = computed(() => {
  let rules: any = [];
  store.rules.forEach((r, index) => {
    if (r.type.indexOf(`product_content_${selectedTab.value.id}`) === 0) {
      let name = r.type.replace(`product_content_${selectedTab.value.id}`, '');
      rules.push({
        title: `规则：${selectedTab.value.content} ${name}`,
        index: (index as any),
      })
    }
  });
  return rules;
})

const touchProducts = computed(() => {
  let data: any = [], index = 0;
  tabs.forEach(({ id, content }) => {
    if (store.product && store.product.content) {

      for (let row of store.product.content) {
        if (row.type.indexOf(id) === 0) {
          let name = row.type.replace(`${id}`, '');
          data.push({
            id: `${id}_${index}`,
            key: `${content} ${name}`,
            value: row.content,
          })
          index++;
        }
      }
    } else {
      data.push({
        id: `${id}_${index}`,
        key: content,
        value: '',
      })
      index++;
    }
  })
  return data;
})

const onAddNewAttribute = () => {
  store.addRule(`product_content_attributes${newAttribute.value}`, 'dom_jquery');
  newAttribute.value = '';
}

</script>