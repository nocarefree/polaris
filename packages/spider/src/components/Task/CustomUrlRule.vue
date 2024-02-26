<template>
  <NpBanner title="指定链接" dismissable @dismiss="onDismiss">

    <NpBlockStack gap="200">
      <NpCard padding="0">
        <NpIndexTable :rows="ruleUrls" :headings="[{ title: '相关链接' }, { title: '指定参数' }, { title: '' }]"
          :selectable="false">
          <template #default="{ index, row }">
            <NpIndexTableRow :id="row.id" :position="index">
              <NpIndexTableCell>
                <NpTextField labe="key" label-hidden v-model="row.url"></NpTextField>
              </NpIndexTableCell>
              <NpIndexTableCell>
                <NpTextField labe="value" label-hidden v-model="row.args"></NpTextField>
              </NpIndexTableCell>
              <NpIndexTableCell>
                <NpButton v-if="ruleUrls.length != (index + 1)" :icon="DeleteMajor" @click="ruleUrls.splice(index, 1)" />
              </NpIndexTableCell>
            </NpIndexTableRow>
          </template>
        </NpIndexTable>
      </NpCard>

      <NpButton :loading="store.loading" @click="onTestRule">保存</NpButton>

      <NpCard padding="0" v-if="rule.maps && rule.maps.length > 0">
        <NpDivider />
        <NpIndexTable :resource-args="{ singular: 'url_maps', plural: 'url_maps' }"
          :headings="[{ title: '链接' }, { title: '传递参数' }, { title: '' }]" :rows="rule.maps" last-column-sticky
          :selectable="false">
          <template #default="{ index, row }">
            <NpIndexTableRow :id="row.id" :position="index">
              <NpIndexTableCell>{{ row.next?.request?.url }}</NpIndexTableCell>
              <NpIndexTableCell>{{ row.additions }}</NpIndexTableCell>
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
import { ref, watch } from "vue";
import { useRouter } from "vue-router"
import { NpTextField, NpBanner, NpCard, NpButton, NpBlockStack, NpIndexTable, NpIndexTableCell, NpIndexTableRow } from "@ncpl/ncpl-polaris";
import { DeleteMajor } from "@ncpl/ncpl-icons";
import { useCurrentTaskWeb } from "../../stores";

const formatUrls = (urls?: { url: string; args: string }[]) => {
  if (!urls || urls.length == 0) {
    urls = [{ url: '', args: '' }];
  }
  return urls.map(((u: any, index: number) => ({ id: `c_url_${index}`, ...u })))
}

const store = useCurrentTaskWeb();
const props = defineProps<{ index: number }>();
const router = useRouter();

const rule = ref(store.getRuleByPosition(props.index));
const ruleUrls = ref(formatUrls(rule.value.content?.urls))

watch(() => ruleUrls.value, (oldValue, newValue) => {
  let lastHeader = newValue[newValue.length - 1];
  if (lastHeader.url) {
    ruleUrls.value.push({
      id: `rule_${newValue.length}`,
      url: '',
      args: ''
    })
  }
}, { deep: true })


const emit = defineEmits(['update:urls', 'dismiss', 'update:rule'])
const ruleError = ref<string | undefined>();


const onTestRule = () => {
  ruleError.value = undefined;
  rule.value.content.urls = ruleUrls.value.map((i) => ({ url: i.url, args: i.args })).filter(i => i.url);
  rule.value.content.type = 'urls';
  store.updateRule(props.index, rule.value).then(() => {
    rule.value = store.getRuleByPosition(props.index);
    ruleUrls.value = formatUrls(rule.value.content?.urls);
  })
}

const onDismiss = () => {
  store.deleteRule(props.index);
}
</script>