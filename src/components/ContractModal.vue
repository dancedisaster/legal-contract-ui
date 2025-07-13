<template>
  <el-dialog
    v-model="isVisible"
    :title="props.contractToEdit ? $t('editContract') : $t('newContract')"

    width="600px"
    @close="() => { isVisible = false; resetForm(ruleFormRef); }"
  >
  <div v-loading="isLoading">
      <el-form :model="ruleForm" label-width="120px" ref="ruleFormRef" :rules="rules">
        <el-form-item :label="$t('legalEntityName')" required  prop="legalEntityName">
          <el-input v-model="ruleForm.legalEntityName"  />
        </el-form-item>

        <el-form-item :label="$t('author')" required prop="authorName">
          <el-input v-model="ruleForm.authorName" />
        </el-form-item>

        <el-form-item :label="$t('description')" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div>
        <el-button @click="isVisible = false; resetForm(ruleFormRef)" :disabled="isLoading">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)" :disabled="isLoading">{{ $t('save') }}</el-button>
      </div>
 
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, reactive, computed, watch } from 'vue';
import { useContractStore } from '@/stores/contractStore';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

import type { Contract } from '../types/Contract';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  contractToEdit?: Contract | null;
}>();

const emit = defineEmits(['onSave', 'onCancel']);
const { t } = useI18n();



const contractStore = useContractStore();

const isLoading = computed(() => contractStore.getIsAddLoading);

const isVisible = ref(false);

interface RuleForm {
  id?: string; // Optional for new contracts
  legalEntityName: string;
  authorName: string;
  description: string;
}

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
  legalEntityName: [{ required: true, message: t('legal-enty-name-required'), trigger: 'blur' }],
  authorName: [{ required: true, message: t('author-name-required'), trigger: 'blur' }],
  description: [{ required: false }]
});

const ruleForm = reactive<RuleForm>({
  legalEntityName: '',
  authorName: '',
  description: ''
});

function openModal() {
  isVisible.value = true
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (ruleForm.id) {

        // console.log('MODAL ## Updating contract:', ruleForm);

        // Edit
        await contractStore.updateContract({
          id: ruleForm.id,
          legalEntityName: ruleForm.legalEntityName,
          authorName: ruleForm.authorName,
          description: ruleForm.description
        } as Contract);

          ElMessage.success('Contract updated successfully');
      } else {
        // Add
        await contractStore.addContract({
          legalEntityName: ruleForm.legalEntityName,
          authorName: ruleForm.authorName,
          description: ruleForm.description
        });

        ElMessage.success('Contract created successfully');

      }

      emit('onSave');

      isVisible.value = false;
      resetForm(formEl);
    } else {
      console.log('error submit!', fields);
      // ElMessage.error('Something went wrong. Please try again.');
    }
  });
}



watch(
  () => props.contractToEdit,
  (newContract) => {

    console.log('Contract to edit:', newContract);

    if (newContract) {
      ruleForm.id = newContract.id;
      ruleForm.legalEntityName = newContract.legalEntityName;
      ruleForm.authorName = newContract.authorName;
      ruleForm.description = newContract.description;
    } else {
      ruleForm.id = '';
      ruleForm.legalEntityName = '';
      ruleForm.authorName = '';
      ruleForm.description = '';
    }
  },
  { immediate: true }
);


defineExpose({ openModal })
</script>
