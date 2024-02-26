<template>
  <NpBanner :title="`[参数${additionKey}]规则`" dismissable @dismiss="onDismiss">

    <NpTabs :tabs="ruleTypes" :disabled="store.loading" v-model:selected="selectedTypeIndex"
      style="margin-top:calc( -1 * var(--p-space-300) )" />

    <NpBlockStack gap="200">
      <NpDivider />
      <NpInlineStack gap="200" align="space-between" block-align="center">
        <p>{{ selectedType.description }}</p>
        <NpButton :loading="store.loading" :disabled="sendDisabled" @click="onTestRule" variant="primary">抓取内容
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
        <NpCheckbox :checked="hasFilterText" @change="onRemoveFilterText" label="过滤内容"></NpCheckbox>
        <NpCheckbox :checked="hasReplaceText" @change="onRemoveReplaceText" label="替换内容"></NpCheckbox>
      </NpInlineStack>
      <NpTextField v-if="hasFilterText" label="过滤包含字符的内容" v-model="noText" @keyup.enter="onAddRuleNoText">
        <template v-if="rule.content.no_text" #verticalContent>
          <NpInlineStack gap="200" alignment="start">
            <NpTag v-for="(text, index) in rule.content.no_text" removable
              @remove="rule.content.no_text.splice(index, 1)">{{
                text }}
            </NpTag>
          </NpInlineStack>
        </template>
      </NpTextField>
      <NpTextField v-if="hasFilterText" label="只保留包含字符的内容" v-model="noText" @keyup.enter="onAddRuleNeedText">
        <template v-if="rule.content.need_text" #verticalContent>
          <NpInlineStack gap="200" alignment="start">
            <NpTag v-for="(text, index) in rule.content.need_text" removable
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

      <div v-if="ruleError">
        <NpBanner tone="critical">
          <pre>{{ ruleError }}</pre>
        </NpBanner>
      </div>

      <NpTextField label="匹配内容" v-if="store.additions[additionKey]" :disabled="true"
        :model-value="store.additions[additionKey]">
      </NpTextField>
    </NpBlockStack>
  </NpBanner>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";
import { NpDivider, NpInlineStack, NpTextField, NpTag, NpButton, NpBanner, NpTabs, NpBlockStack, NpCard, NpCheckbox } from "@ncpl/ncpl-polaris";
import { useCurrentTaskWeb } from "../../stores";

const store = useCurrentTaskWeb();
const props = defineProps<{ index: number }>();

const rule = ref(store.getRuleByPosition(props.index));


const emit = defineEmits(['update:urls', 'dismiss', 'update:rule'])
const ruleError = ref<string | undefined>();
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
{
  content: '链接循环',
  id: 'pages',
  fields: {
    start: {
      text: '链接',
      required: true
    },
    end: {
      text: '页数',
      required: true
    },
  },
  description: ''
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



const additionKey = computed<string>(() => {
  return rule.value.type.replace('additions_', '');
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
const needText = ref('');
const hasFilterText = ref((Array.isArray(rule.value.content.no_text) && rule.value.content.no_text.length > 0) || (Array.isArray(rule.value.content.need_text) && rule.value.content.need_text.length > 0));
const onAddRuleNoText = () => {
  if (noText.value) {
    if (!Array.isArray(rule.value.content.no_text)) {
      rule.value.content.no_text = [];
    }
    rule.value.content.no_text.push(noText.value)
    noText.value = '';
  }
}
const onAddRuleNeedText = () => {
  if (needText.value) {
    if (!Array.isArray(rule.value.content.need_text)) {
      rule.value.content.need_text = [];
    }
    rule.value.content.need_text.push(needText.value)
    needText.value = '';
  }
}
const onRemoveFilterText = (s: boolean) => {
  hasFilterText.value = s;
  if (!s) {
    rule.value.content.no_text = [];
    rule.value.content.need_text = [];
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


const onTestRule = () => {
  ruleError.value = undefined;
  store.updateRule(props.index, rule.value).then(() => {
    store.touchAdditions();
    rule.value = store.getRuleByPosition(props.index)
  })
}


const onDismiss = () => {
  store.deleteRule(props.index);
}
</script>