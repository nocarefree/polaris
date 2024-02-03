<template>
  <NpLegacyCard>
    <NpTabs :tabs="tabs" v-model:selected="selectedTab">
    </NpTabs>
    <NpDivider />
    <NpLegacyCardSection>
      <div>
        <template v-if="selectedTab == 0">
          <NpTextField :disabled="store.loading" label="链接" v-model="store.data.request.url" placeholder="请填写名称"
            :error="urlError" style="margin-bottom:20px">
            <template #connectedLeft>
              <NpSelect :disabled="store.loading" label-hidden label="method" v-model="store.data.request.method"
                :options="[{ label: 'GET', value: 'get' }, { label: 'POST', value: 'post' }]">
              </NpSelect>
            </template>
            <template #connectedRight>
              <NpButton @click="onSend" :disabled="Boolean(urlError) || store.loading" :loading="store.loading">
                抓取
              </NpButton>
            </template>
          </NpTextField>
          <NpTextField v-if="store.data.request.method == 'post'" label="发送内容" :multiline="4" v-model="requestBody">
          </NpTextField>
          <NpButton variant="plain" @click="requestHeaderOpen = !requestHeaderOpen">设置请求头部</NpButton>
          <NpCollapsible v-model:open="requestHeaderOpen" id="requestHeadersContent">
            <NpLegacyCard style="margin-top:10px">
              <NpIndexTable :resource-name="{ singular: 'requestHeaders', plural: 'requestHeaders', }"
                :headings="[{ title: '键' }, { title: '值' }, { title: '' }]" :rows="requestHeaders" last-column-sticky>
                <template #default="{ index, row }">
                  <NpIndexTableRow :id="row.id" :position="index">
                    <NpIndexTableCell>
                      <NpTextField labe="key" label-hidden v-model="row.key"></NpTextField>
                    </NpIndexTableCell>
                    <NpIndexTableCell>
                      <NpTextField labe="value" label-hidden v-model="row.value"></NpTextField>
                    </NpIndexTableCell>
                    <NpIndexTableCell>
                      <NpButton v-if="requestHeaders.length != (index + 1)" :icon="DeleteMajor"
                        @click="onRemoveRequestHeader(index)" />
                    </NpIndexTableCell>
                  </NpIndexTableRow>
                </template>
              </NpIndexTable>
            </NpLegacyCard>
          </NpCollapsible>
          <div v-if="requestError">
            <NpBanner tone="critical">
              <p>{{ requestError.response ? requestError.response.data : requestError.message }}</p>
            </NpBanner>
          </div>
          <div v-if="store.data.exception">
            <NpBanner tone="critical">
              <p>{{ store.data.exception }}</p>
            </NpBanner>
          </div>
        </template>
        <template v-else-if="selectedTab == 1">
          <NpBlockStack v-if="store.data.sended" gap="300">
            <NpInlineStack gap="200">
              <NpBadge v-if="!store.data.exception && store.data.sended == 1" tone="success">成功
              </NpBadge>
              <NpBadge v-else tone="critical">异常</NpBadge>
            </NpInlineStack>
            <NpDivider />
            <NpInlineStack gap="200" align="space-between">
              <NpButton variant="plain" @click="onResponseBodyOpen">响应内容</NpButton>

              <div style="flex:1"></div>
              <NpButton v-if="!editing" @click="onOpenEditBody" :icon="EditMinor"></NpButton>
              <NpButtonGroup v-else>
                <NpButton @click="editing = false">取消</NpButton>
                <NpButton variant="primary" @click="onSaveResponse()">保存</NpButton>
              </NpButtonGroup>
              <NpButton v-if="store.data.response?.body" @click="onCopy" :icon="ClipboardMinor"></NpButton>


            </NpInlineStack>
            <NpCollapsible v-model:open="responseBodyOpen" id="responseBodyContent">
              <NpLegacyCard>
                <NpTextField v-if="editing" :disabled="store.responseLoading" v-model="responseBody" label="" label-hidden
                  :multiline="4"></NpTextField>
                <NpScrollable v-else shadow :style="{ height: '300px', width: '100%' }">
                  <pre><code class="language-html line-numbers">{{ store.data.response?.body }}</code></pre>
                </NpScrollable>
              </NpLegacyCard>
            </NpCollapsible>
            <NpDivider />
            <NpInlineStack>
              <NpButton variant="plain" @click="responseHeaderOpen = !responseHeaderOpen">响应头部</NpButton>
            </NpInlineStack>
            <NpCollapsible v-model:open="responseHeaderOpen" id="responseHeadersContent">
              <NpLegacyCard style="margin-top:10px">
                <NpIndexTable :resource-name="{ singular: 'responseHeaders', plural: 'responseHeaders', }"
                  :headings="[{ title: '键' }, { title: '值' },]" :rows="store.responseHeaders" last-column-sticky
                  :selectable="false">
                  <template #default="{ index, row }">
                    <NpIndexTableRow :id="row.id" :position="index">
                      <NpIndexTableCell>{{ row.key }}</NpIndexTableCell>
                      <NpIndexTableCell>{{ row.value }}</NpIndexTableCell>
                      <NpIndexTableCell>
                        <NpButton :icon="DeleteMajor" />
                      </NpIndexTableCell>
                    </NpIndexTableRow>
                  </template>
                </NpIndexTable>
              </NpLegacyCard>
            </NpCollapsible>
          </NpBlockStack>
        </template>
      </div>
    </NpLegacyCardSection>
  </NpLegacyCard>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { NpLegacyCard, NpLegacyCardSection, NpDivider, NpButtonGroup, NpInlineStack, NpSelect, NpTabs, NpTextField, NpCollapsible, NpIndexTable, NpIndexTableRow, NpIndexTableCell, NpButton, NpBlockStack, NpScrollable, NpBadge, NpBanner } from "@ncpl/ncpl-polaris";
import { DeleteMajor, ClipboardMinor, EditMinor } from "@ncpl/ncpl-icons";
import { useCurrentTaskWeb } from "../../stores";
const send = defineEmits({})
const selectedTab = ref(0);
const urlError = ref<string | undefined>();
const requestError = ref<any>();
const requestHeaderOpen = ref(false);
const responseHeaderOpen = ref(false);
const responseBodyOpen = ref(false);
const editing = ref(false);
const responseBody = computed({
  get() {
    return store.data.response?.body || ''
  },
  set(value: string) {
    if (!store.data.response) {
      store.data.response = {
        status: '200',
        body: '',
        headers: {},
      }
    }
    store.data.response.body = value;
  }
});
const requestBody = computed({
  get() {
    return store.data.request.options?.body || ''
  },
  set(value: string) {
    if (!store.data.request.options) {
      store.data.request.options = { body: '' };
    }
    store.data.request.options.body = value;
  }
});
const store = useCurrentTaskWeb();
const tabs = computed(() => {
  return [{ id: 'request', content: '请求' }, { id: 'response', content: '响应', disabled: !Boolean(store.data.sended) }];
})
const requestHeaders = ref(store.requestOptionsHeaders)
const onRemoveRequestHeader = (index: number) => {
  requestHeaders.value.splice(index, 1);
}
watch(() => requestHeaders.value, (oldValue, newValue) => {
  let lastHeader = newValue[newValue.length - 1];
  if (lastHeader.key && lastHeader.value) {
    requestHeaders.value.push({
      id: `${requestHeaders.value.length + 1}`,
      key: '',
      value: ''
    })
  }
}, { deep: true, flush: 'post' });
const onSend = () => {
  urlError.value = undefined;
  if (store.data.request.url.length < 7 && store.data.request.url.indexOf('http') !== 0) {
    urlError.value = '无效链接'
  } else {
    store.setRequestOptionsHeaders(requestHeaders.value)
    //console.log(store.data, typeof store.data.request.options)
    store.update();
  }
}

const onOpenEditBody = () => {
  responseBodyOpen.value = true;
  editing.value = true;
}

const onResponseBodyOpen = () => {
  responseBodyOpen.value = !responseBodyOpen.value;
  if (!store.data.response) {
    store.getResponse();
  }
}

const onSaveResponse = () => {
  editing.value = false;
  store.updateResponse();
}

const onCopy = () => {
  let inputDom = document.createElement('textarea') // js创建一个文本框
  document.body.appendChild(inputDom) //将文本框暂时创建到实例里面
  inputDom.value = store.data.response?.body || ''; //将需要复制的内容赋值到创建的文本框中
  inputDom.select() //选中文本框中的内容
  inputDom.focus()
  document.execCommand('copy') //执行复制操作
  document.body.removeChild(inputDom) //最后移出
}
</script>