<template>
  <div class="min-h-8 p-6 max-w-6xl mx-auto mt-2">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-bold mb-6 text-gray-900 dark:text-white text-2xl">{{ $t('title-contracts-list') }}</h2>

      <el-button type="primary" @click="modalRef?.openModal()">
        {{ $t('addContract') }}
      </el-button>

    </div>

    <div v-if="isLoading" class="text-gray-500 dark:text-gray-400">
      {{ $t('loading') }}...
    </div>

    <div v-else-if="contractStore.error" class="text-red-500 dark:text-red-400">
      {{ contractStore.error }}
    </div>


    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" v-loading="isLoading">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th class="p-3">#</th>
            <th class="p-3">{{ $t('legalEntityName') }}</th>
            <th class="p-3">{{ $t('author') }}</th>
            <th class="p-3">{{ $t('description') }}</th>
            <th class="p-3">{{ $t('createdAt') }}</th>
            <th class="p-3 text-center">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            v-for="(contract, index) in contracts" :key="contract.id">
            <td class="p-3 text-sm text-gray-900 dark:text-white">{{ index + 1 }}</td>
            <td class="p-3 text-sm text-gray-900 dark:text-white">{{ contract.legalEntityName }}</td>
            <td class="p-3 text-sm text-gray-900 dark:text-white">{{ contract.authorName }}</td>
            <td class="p-3 text-sm text-gray-900 dark:text-white">{{ contract.description }}</td>
            <td class="p-3 text-sm text-gray-500">{{ formatDate(contract.createdAt) }}</td>

            <td class="p-3 text-sm text-center">
              <div class="flex flex-col sm:flex-row justify-center items-center gap-2">
                <el-button type="primary" @click="editContract(contract)">{{ $t('edit') }}</el-button>
                <el-button type="danger" @click="deleteContract(contract)">{{ $t('delete') }}</el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-6 flex justify-center">
      <el-pagination layout="total, prev, pager, next" v-model:current-page="currentPage" v-model:page-size="pageSize"
        :total="totalContracts" background />
    </div>

    <ContractModal ref="modalRef" :contract-to-edit="contractToEdit" @onSave="handleModalSave" />

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useContractStore } from '@/stores/contractStore';
import ContractModal from '@/components/ContractModal.vue';
import type { Contract } from '../types/Contract';
import { ElMessageBox, ElMessage } from 'element-plus';
import formatDateUtil from '@/utils/formatDate';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();

const contractStore = useContractStore();
const modalRef = ref<InstanceType<typeof ContractModal> | null>(null);
const pageSize = 10; // Default page size

const contractToEdit = ref<Contract | null>(null);


const contracts = computed(() => contractStore.contracts);
const isLoading = computed(() => contractStore.isPaginationLoading);
const totalContracts = computed(() => contractStore.getTotalContracts);


const currentPage = computed({
  get: () => contractStore.currentPage,
  set: (val) => {
    contractStore.currentPage = val;
    contractStore.loadContractsWithPagination(val, pageSize);
  }
})


function formatDate(dateStr: string): string {
  return formatDateUtil(dateStr);
}

const editContract = (contract: Contract) => {
  contractToEdit.value = contract;
  modalRef.value?.openModal();
}
const deleteContract = (contract: Contract) => {
  ElMessageBox.confirm(
    t('delete-confirmation', { legalEntityName: contract.legalEntityName }),
    t('confirm-delete'),
    {
      confirmButtonText: t('delete'),
      cancelButtonText: t('cancel'),
      type: 'warning',
    }
  )
    .then(async () => {
      await contractStore.deleteContract(contract.id);
      await contractStore.loadContractsWithPagination(1, pageSize);
      ElMessage.success(t('contract-deleted-successfully'));
    })
    .catch(() => {
      /* cancelado */
    });
}

const handleModalSave = async () => {
  contractStore.currentPage = 1;

  await contractStore.loadContractsWithPagination(currentPage.value, pageSize);
};


onMounted(() => {
  contractStore.loadContractsWithPagination(1, pageSize);
})
</script>
