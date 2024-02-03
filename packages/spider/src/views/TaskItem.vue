<template>
  <NpContextualSaveBar message="未保存产品" :save-action="saveAction" :discard-action="{
    content: '取消',
    discardConfirmationModal: true,
    onAction: onBack,
  }" />
  <NpPage :title="task.id ? '修改任务' : '添加任务'" :back-action="{ content: 'Products', url: '/tasks' }">
    <NpForm action="post">
      <NpLayout>
        <NpLayoutSection v-if="errors.length > 0">
          <NpBanner tone="critical" :title="`此处有${errors.length}个问题`">
            <NpList>
              <NpListItem v-for="error in errors">{{ error.content }}</NpListItem>
            </NpList>
          </NpBanner>
        </NpLayoutSection>

        <NpLayoutSection>
          <NpLegacyCard sectioned>
            <NpFormLayout>
              <NpTextField label="任务名" v-model="task.name" placeholder="请填写名称" :error="getError('name')" />
            </NpFormLayout>
          </NpLegacyCard>

        </NpLayoutSection>
        <NpLayoutSection variant="oneThird">
          <NpLegacyCard title="线程" sectioned>
            <NpSelect v-model="task.process" label-hidden placeholder="请选择线程" label="process" :options="processes"
              :error="getError('process')" />
          </NpLegacyCard>
        </NpLayoutSection>
        <NpLayoutSection>
          <NpPageActions :primary-action="saveAction" />
        </NpLayoutSection>
      </NpLayout>
    </NpForm>
  </NpPage>
</template>
<script setup lang="ts">
import { ref } from "vue";
import request from "../request"
import { useRouter } from "vue-router";
import { NpPage, NpLayout, NpLayoutSection, NpContextualSaveBar, NpForm, NpFormLayout, NpTextField, NpLegacyCard, NpSelect, NpPageActions, NpBanner, NpList, NpListItem } from "@ncpl/ncpl-polaris";


const router = useRouter();
const errors = ref<{ key: string, content: string }[]>([])

const onSave = () => {
  let _errors = [];
  if (!task.value.name) {
    _errors.push({
      key: 'name',
      content: '标题不能为空'
    })
  }

  if (!task.value.process) {
    _errors.push({
      key: 'process',
      content: '线程不能为空'
    })
  }

  errors.value = _errors;

  if (_errors.length == 0) {
    saveAction.value.loading = true;

    (!task.value.id ? request.post('tasks', { ...task.value }) : request.put(`tasks/${task.value.id}`, { ...task.value })).then(({ id }: any) => {
      if (id) {
        return router.push('/tasks');
      }
    }).finally(() => {
      saveAction.value.loading = false;
    })
  }

}

const saveAction = ref({
  onAction: onSave,
  content: '保存',
  loading: false,
  disabled: false,
});

const task = ref({
  id: '',
  name: '',
  process: '',
})

const processes: { value: string; label: string }[] = [];
for (let i = 1; i < 10; i++) {
  processes.push({
    value: `${i}`,
    label: `${i}`,
  })
}

const onBack = () => {
  router.back();
}

const getError = (key: string) => {
  const error = errors.value.find(i => i.key == key);
  return error ? error.content : undefined;
}



</script>