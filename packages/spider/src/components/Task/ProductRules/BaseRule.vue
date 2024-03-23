<template>
    <NpBanner :title="title" dismissable @dismiss="onDismiss">
  
      <NpTabs :tabs="ruleTypes" :disabled="store.loading" v-model:selected="selectedTypeIndex"
        style="margin-top:calc( -1 * var(--p-space-300) )" />
  
      <NpBlockStack gap="200">
        <NpDivider />
        <NpInlineStack gap="200" align="space-between" block-align="center">
          <p>{{ selectedType.description }}</p>
          <NpButton :loading="store.loading" :disabled="sendDisabled" @click="onTestRule" variant="primary">保存并测试链接
          </NpButton>
        </NpInlineStack>
  
  
  
        <NpCard>
  
          <NpInlineStack gap="200" align="center" block-align="center">
  
            <NpTextField style="flex:1" :disabled="store.loading" :label="selectedType.fields['start'].text" :multiline="4"
              v-model="rule.content.range.start">
  
            </NpTextField>
  
            <div style="width:30px;text-align: center;"> - </div>
  
            <NpTextField style="flex:1" :disabled="store.loading" :label="selectedType.fields['end'].text" :multiline="4"
              v-model="rule.content.range.end">
  
            </NpTextField>
  
          </NpInlineStack>
  
          <NpCheckbox :checked="rule.content.html_entity_decode" @change="e => rule.content.html_entity_decode = e"
            label="链接解码转译（链接乱码时候使用）"></NpCheckbox>
  
  
        </NpCard>
  
  
  
  
  
        <div v-if="ruleError">
  
          <NpBanner tone="critical">
  
            <pre>{{ ruleError }}</pre>
  
          </NpBanner>
  
        </div>
  
  
  
        <NpCard padding="0" title="规则抓取链接（前10条）" v-else-if="rule.urls && rule.urls.length > 0">
  
          <NpDivider />
  
  
  
          <NpIndexTable :resource-name="{ singular: 'urls', plural: 'urls' }" :headings="[{ title: '链接' }, { title: '' }]"
            :rows="rule.urls" last-column-sticky :selectable="false">
  
            <template #default="{ index, row }">
  
              <NpIndexTableRow :id="row.id" :position="index">
  
                <NpIndexTableCell>{{ row.request.url }}</NpIndexTableCell>
  
                <NpIndexTableCell>
  
                  <NpButton @click="router.push(`/webs/${row.id}`)">测试</NpButton>
  
                </NpIndexTableCell>
  
              </NpIndexTableRow>
            </template>
          </NpIndexTable>
        </NpCard>
  
  
      </NpBlockStack>
  
    </NpBanner>
  </template>
  <script setup lang="ts">
  import { computed, watch } from "vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router"
  import { NpDivider, NpInlineStack, NpTextField, NpIndexTable, NpIndexTableRow, NpIndexTableCell, NpButton, NpBanner, NpTabs, NpBlockStack, NpCard, NpText, NpCheckbox } from "@ncpl/ncpl-polaris";
  import request from "../../request";
  import { useCurrentTaskWeb } from "../../stores";
  
  const store = useCurrentTaskWeb();
  const props = defineProps<{ index: number }>();
  
  const rule = ref(store.getRuleByPosition(props.index));
  
  
  const emit = defineEmits(['update:urls', 'dismiss', 'update:rule'])
  const ruleError = ref<string | undefined>();
  const router = useRouter();
  const ruleTypes = [{
    content: '区域截取',
    id: 'area',
    fields: {
      start: {
        text: '开始',
        required: true
      },
      end: {
        text: '结束',
        required: true
      },
    },
    description: '通过前后字段截取内容，找出内容中所有链接。'
  },
  {
    content: '字符截取',
    id: 'substr',
    fields: {
      start: {
        text: '开始',
        required: true
      },
      end: {
        text: '结束',
        required: true
      },
    },
    description: '通过前后字段中的内容，循环找到内容作为链接。'
  },
  {
    content: '正则匹配',
    id: 'regular',
    fields: {
      start: {
        text: '正则表达式',
        required: true
      },
      end: {
        text: '合成参数',
        required: true
      },
    },
    description: '通过正则，循环找到内容作为链接。'
  },
  {
    content: '源码query写法',
    id: 'dom_jquery',
    fields: {
      start: {
        text: '匹配表达式(jquery)',
        required: true
      },
      end: {
        text: '标签属性（href）',
        required: true
      },
    },
    description: '通过jquery表达式，循环找到内容作为链接。'
  },
  ];
  
  const selectedTypeIndex = computed({
    get() {
      return ruleTypes.findIndex(i => rule.value.content.type == i.id) || 0
    },
    set(index) {
      rule.value.content.type = ruleTypes[index].id;
      rule.value.content.range = { start: '', end: '' };
      ruleError.value = undefined;
    }
  });
  
  const selectedType = computed(() => {
    return ruleTypes[selectedTypeIndex.value];
  });
  
  const sendDisabled = computed(() => {
    for (let key in selectedType.value.fields) {
      if (!rule.value.content.range[key]) {
        return true;
      }
    }
    return false;
  })
  
  
  const title = computed(() => {
    switch (rule.value.type) {
      case 'product_list':
        return '列表页获取规则';
      case 'product_url':
        return '产品链接获取规则';
      case 'product_list_next':
        return '下一页获取规则(自动循环)';
      case 'product_list_more':
        return '更多页获取规则';
      default:
        return '规则丢失';
    }
  });
  
  const onTestRule = () => {
    ruleError.value = undefined;
    store.updateRule(props.index, rule.value).then(() => {
      rule.value = store.getRuleByPosition(props.index)
    })
  }
  
  
  const onDismiss = () => {
    store.deleteRule(props.index);
  }
  </script>