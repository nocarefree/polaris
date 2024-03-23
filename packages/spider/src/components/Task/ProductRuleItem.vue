<template>
  <NpBanner :title="title" dismissable @dismiss="onDismiss">

    <NpTabs :tabs="ruleTypes" :disabled="store.loading" v-model:selected="selectedTypeIndex"
      style="margin-top:calc( -1 * var(--p-space-300) )" />

    <NpBlockStack gap="200">
      <NpDivider />
      <NpInlineStack gap="200" align="space-between" block-align="center">
        <p>{{ selectedType.description }}</p>
        <NpButton :loading="store.loading" :disabled="sendDisabled" @click="onTestRule" variant="primary">测试规则
        </NpButton>
      </NpInlineStack>

      <NpCard>

        <NpInlineStack gap="200" align="center" block-align="center">
          <NpTextField style="flex:1" :disabled="store.loading" :label="selectedType.fields['start'].text" :multiline="4"
            v-model="rule.content.range.start">
          </NpTextField>
          <NpTextField style="flex:1" :disabled="store.loading" :label="selectedType.fields['end'].text" :multiline="4"
            v-model="rule.content.range.end"></NpTextField>
        </NpInlineStack>
      </NpCard>
      <NpCard v-if="selectedType.id == 'json'">
        <NpInlineStack gap="200" align="center" block-align="center">
          <NpTextField style="flex:1" :disabled="store.loading" label="循环节点" v-model="rule.content.range.node"
            :label-action="mRangeAction">
          </NpTextField>

          <NpTextField v-if="mRangeActionActive" style="flex:1" label="参数节点" v-model="rule.content.range.arg" />
        </NpInlineStack>
      </NpCard>

      <NpInlineStack gap="300">
        <NpCheckbox :checked="rule.content.no_repeat" @change="(e: boolean) => rule.content.no_repeat = e" label="去重">
        </NpCheckbox>
        <NpCheckbox :checked="rule.content.no_params" @change="(e: boolean) => rule.content.no_params = e" label="去参数">
        </NpCheckbox>
        <NpCheckbox :checked="hasNoText" @change="onRemoveNoText" label="排除字符"></NpCheckbox>
        <NpCheckbox :checked="hasReplaceText" @change="onRemoveReplaceText" label="替换内容"></NpCheckbox>
      </NpInlineStack>
      <NpTextField v-if="hasNoText" label="不包含字符" v-model="noText" @keyup.enter="onAddRuleNoText">
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

    </NpBlockStack>
  </NpBanner>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";
import { NpDivider, NpInlineStack, NpTextField, NpButton, NpBanner, NpTabs, NpBlockStack, NpCard, NpCheckbox, NpTag } from "@ncpl/ncpl-polaris";
import { useCurrentTaskWeb } from "../../stores";

const store = useCurrentTaskWeb();
const props = defineProps<{ index: number; title: string }>();

const rule = computed(() => store.rules[props.index]);

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

const showStartAndEnd = computed(() => {
  if (selectedType.value.id == 'json') {
    return false
  }
  return true;
})

const emit = defineEmits(['update:urls', 'dismiss', 'update:rule'])
const ruleError = ref<string | undefined>();

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


const ruleTypes: {
  content: string;
  id: string;
  fields: {
    start: { text: string; required?: boolean };
    end: { text: string; required?: boolean };
    args?: { text: string; required?: boolean }
    node?: { text: string; required?: boolean }
  };
  description?: string;
}[] = [{
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
  description: '通过前后字段截取内容，找出内容。'
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
  description: '通过正则，循环找到内容。'
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
{
  content: 'json分析',
  id: 'json',
  fields: {
    start: {
      text: '正文截取开始',
    },
    end: {
      text: '结束',
    },
    node: {
      text: '循环节点',
    },
    args: {
      text: '多参数',
      required: true
    }
  },
  description: '通过jquery表达式，循环找到内容作为链接。'
},
{
  content: '固定值',
  id: 'content',
  fields: {
    start: {
      text: '填下内容',
      required: true
    },
    end: {
      text: '特殊参数',
    },
  },
  description: '通过固定值[参数]替换'
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

const sendDisabled = computed(() => {
  let key: "start" | "end" | 'args' | "node";
  for (key in selectedType.value.fields) {
    if (selectedType.value.fields[key]?.required && !rule.value.content.range[key]) {
      return true;
    }
  }
  return false;
})



const onTestRule = () => {
  ruleError.value = undefined;
  store.updateRule(props.index, rule.value).then(() => {
    store.touchProduct();
  })
}


const onDismiss = () => {
  store.deleteRule(props.index);
}



const replaceText = ref({
  search: '', replace: ''
});
const hasReplaceText = ref(rule.value.content.replace_text && Array.isArray(rule.value.content.replace_text.search));
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

</script>