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

          <NpTextField v-if="!mRangeActionActive" style="flex:1" :disabled="store.loading"
            :label="selectedType.fields['end'].text" :multiline="4" v-model="rule.content.range.end"
            :label-action="mRangeAction">
          </NpTextField>
          <NpTextField v-else style="flex:1" label="多参数" v-model="rangeArgsText" @keyup.enter="onAddRangeArgsText"
            :label-action="mRangeAction">
            <template v-if="rule.content.range.args" #verticalContent>
              <NpInlineStack gap="200" alignment="start">
                <NpTag v-for="(text, index) in rule.content.range.args" removable
                  @remove="rule.content.range.args.splice(index, 1)">{{
                    text }}
                </NpTag>
              </NpInlineStack>
            </template>
          </NpTextField>
        </NpInlineStack>
      </NpCard>

      <NpInlineStack gap="300">
        <NpCheckbox :checked="rule.content.no_params" @change="(e: boolean) => rule.content.no_params = e" label="去参数">
        </NpCheckbox>
        <NpCheckbox :checked="rule.content.html_entity_decode"
          @change="(e: boolean) => rule.content.html_entity_decode = e" label="链接解码转译"></NpCheckbox>
        <NpCheckbox :checked="hasNoText" @change="onRemoveNoText" label="过滤内容"></NpCheckbox>
        <NpCheckbox :checked="hasReplaceText" @change="onRemoveReplaceText" label="替换内容"></NpCheckbox>
        <NpCheckbox :checked="hasCustomUrl" @change="onRemoveCustomUrl" label="自定义链接"></NpCheckbox>
        <NpCheckbox :checked="hasNextPost" @change="onRemovePost" label="POST"></NpCheckbox>
      </NpInlineStack>
      <NpTextField v-if="hasNoText" label="过滤包含字符的内容" v-model="noText" @keyup.enter="onAddRuleNoText">
        <template v-if="rule.content.no_text" #verticalContent>
          <NpInlineStack gap="200" alignment="start">
            <NpTag v-for="(text, index) in rule.content.no_text" removable
              @remove="rule.content.no_text.splice(index, 1)">{{
                text }}
            </NpTag>
          </NpInlineStack>
        </template>
      </NpTextField>
      <NpCard v-if="hasReplaceText">
        <NpInlineStack gap="200">

          <NpTextField style="flex:1" label="查找字符" v-model="replaceText.search"
            @keyup.enter="(e: string) => onAddReplaceText('search')">
            <template v-if="rule.content.replace_text?.search" #verticalContent>
              <NpInlineStack gap="200" alignment="start">
                <NpTag v-for="(text, index) in rule.content.replace_text.search" removable
                  @remove="rule.content.replace_text.search.splice(index, 1)">{{
                    text }}
                </NpTag>
              </NpInlineStack>
            </template>
          </NpTextField>
          <NpTextField style="flex:1" label="替换" v-model="replaceText.replace"
            @keyup.enter="(e: string) => onAddReplaceText('replace')">
            <template v-if="rule.content.replace_text?.replace" #verticalContent>
              <NpInlineStack gap="200" alignment="start">
                <NpTag v-for="(text, index) in rule.content.replace_text.replace" removable
                  @remove="rule.content.replace_text.replace.splice(index, 1)">{{
                    text }}
                </NpTag>
              </NpInlineStack>
            </template>
          </NpTextField>

        </NpInlineStack>
      </NpCard>


      <NpTextField v-if="(hasCustomUrl || hasNextPost) && !mRangeAction" label="参数名称" v-model="rule.content.range.arg">
      </NpTextField>
      <NpTextField v-if="hasCustomUrl" label="自定义链接" v-model="rule.content.custom_url"></NpTextField>
      <NpTextField v-if="hasNextPost" label="POST内容" v-model="rule.content.custom_post_body"></NpTextField>


      <div v-if="ruleError">
        <NpBanner tone="critical">
          <pre>{{ ruleError }}</pre>
        </NpBanner>
      </div>

      <NpCard padding="0" title="抓取链接" v-else-if="rule.maps && rule.maps.length > 0">
        <NpDivider />

        <NpIndexTable :resource-name="{ singular: 'url_maps', plural: 'url_maps' }"
          :headings="[{ title: '链接' }, { title: '' }]" :rows="rule.maps" last-column-sticky :selectable="false">
          <template #default="{ index, row }">
            <NpIndexTableRow :id="row.id" :position="index">
              <NpIndexTableCell>{{ row.next?.request?.url }}</NpIndexTableCell>
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
import { computed } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router"
import { NpDivider, NpInlineStack, NpTextField, NpIndexTable, NpIndexTableRow, NpIndexTableCell, NpTag, NpButton, NpBanner, NpTabs, NpBlockStack, NpCard, NpCheckbox } from "@ncpl/ncpl-polaris";
import { useCurrentTaskWeb } from "../../stores";

const store = useCurrentTaskWeb();
const props = defineProps<{ index: number }>();

const rule = ref(store.getRuleByPosition(props.index));


const emit = defineEmits(['update:urls', 'dismiss', 'update:rule'])
const ruleError = ref<string | undefined>();
const router = useRouter();
const ruleTypes: {
  content: string;
  id: string;
  fields: { [key: string]: { text: string; required?: boolean } }
  description?: string;
}[] = [{
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
      text: '节点',
      required: true
    },
    end: {
      text: '表达式',
      required: true
    },
  },
  description: '通过jquery表达式，循环找到内容作为链接。'
},
{
  content: 'json分析',
  id: 'json',
  fields: {
    start: {
      text: '节点',
    },
    end: {
      text: '参数',
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
    ruleError.value = undefined;
  }
});

const selectedType = computed(() => {
  return ruleTypes[selectedTypeIndex.value];
});

const mRangeActionActive = computed({
  get() {
    if (selectedType.value.id == 'dom_jquery' || selectedType.value.id == 'json') {
      return Array.isArray(rule.value.content.range.args);
    }
    return false;
  },
  set(value) {
    if (value) {
      if (!rule.value.content.range.args) {
        rule.value.content.range.args = [];
      }
    } else {
      if (rule.value.content.range.args) {
        delete rule.value.content.range.args;
      }
    }
  }
})

const mRangeAction = computed(() => {
  if (selectedType.value.id == 'dom_jquery' || selectedType.value.id == 'json') {
    return {
      content: mRangeActionActive.value ? '取消参数' : '设置参数',
      onAction: () => { mRangeActionActive.value = !mRangeActionActive.value }
    }
  }
  return undefined;
})

const sendDisabled = computed(() => {
  let key: string;
  for (key in selectedType.value.fields) {
    if (selectedType.value.fields[key].required && !rule.value.content.range[key]) {
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

const rangeArgsText = ref('');
const onAddRangeArgsText = () => {
  if (rangeArgsText.value) {
    if (!Array.isArray(rule.value.content.range.args)) {
      rule.value.content.range.args = [];
    }
    rule.value.content.range.args.push(rangeArgsText.value)
    rangeArgsText.value = '';
  }

}

const noText = ref('');
const hasNoText = ref(Array.isArray(rule.value.content.no_text) && rule.value.content.no_text.length > 0);
const onAddRuleNoText = () => {
  if (noText.value) {
    if (!Array.isArray(rule.value.content.no_text)) {
      rule.value.content.no_text = [];
    }
    rule.value.content.no_text.push(noText.value)
    noText.value = '';
  }
}
const onRemoveNoText = (s: boolean) => {
  hasNoText.value = s;
  if (!s) {
    rule.value.content.no_text = [];
  }
}


const replaceText = ref({
  search: '', replace: ''
});
const hasReplaceText = ref(Boolean(rule.value.content.replace_text) && Array.isArray(rule.value.content.replace_text.search));
const onAddReplaceText = (type: "search" | 'replace') => {
  if (replaceText.value[type]) {
    if (typeof rule.value.content.replace_text == 'undefined') {
      rule.value.content.replace_text = { search: [], replace: [] }
    }
    rule.value.content.replace_text[type].push(replaceText.value[type])
    replaceText.value[type] = '';
  }
}
const onRemoveReplaceText = (s: boolean) => {
  hasReplaceText.value = s;
  if (!s) {
    delete rule.value.content.replace_text;
  }
}



const hasCustomUrl = ref(Boolean(rule.value.content?.custom_url));
const onRemoveCustomUrl = (e: boolean) => {
  hasCustomUrl.value = e;
  if (!e) { rule.value.content.custom_url = ''; }
}

const hasNextPost = ref(Boolean(rule.value.content?.custom_method == 'post'))
const onRemovePost = (e: boolean) => {
  hasNextPost.value = e;
  if (!e) {
    rule.value.content.custom_method = 'get';
    rule.value.content.custom_post_body = '';
  } else {
    rule.value.content.custom_method = 'post';
  }
}

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