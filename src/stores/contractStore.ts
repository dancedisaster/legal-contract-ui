import { defineStore } from 'pinia'
import type { Contract } from '@/types/Contract'
import { fetchAllContracts, createContract,fetchPaginatedContracts, deleteContract  } from '@/services/contractService'
import { updateContract } from '../services/contractService'

export const useContractStore = defineStore('contract', {
  state: () => ({
    contracts: [] as Contract[],
    isLoading: false,
    error: null as string | null,
    
    isDeleteLoading: false,
    isUpdateLoading: false,
    isAddLoading: false,

    currentPage: 1,

    totalContracts: 0,
    isPaginationLoading: false,
  }),
  getters: {
    getContracts: (state) => state.contracts,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getIsDeleteLoading: (state) => state.isDeleteLoading,
    getIsUpdateLoading: (state) => state.isUpdateLoading,
    getCurrentPage: (state) => state.currentPage,
    getTotalContracts: (state) => state.totalContracts,
    getIsPaginationLoading: (state) => state.isPaginationLoading,
    getIsAddLoading: (state) => state.isAddLoading,
  },

  actions: {
    setContracts(data: Contract[]) {
      this.contracts = data
    },
    async loadContracts() {
      this.isLoading = true;
      this.error = null;

      try {
        const contracts = await fetchAllContracts();
        this.setContracts(contracts);
      } catch (error) {
        this.error = 'Failed to load contracts';
        console.error('Error loading contracts:', error)
      } finally {
        this.isLoading = false
      }
    },
    async addContract(contract: Contract) {
      this.isAddLoading = true;
      this.error = null;

      try {
        const newContract = await createContract(contract);
        this.contracts.push(newContract);
      } catch (error) {
        this.error = 'Failed to add contract';
        console.error('Error adding contract:', error)
      } finally {
        this.isAddLoading = false
      }
    },

    async deleteContract(contractId: string) {
      this.isDeleteLoading = true;
      this.error = null;

      try {
 
        await deleteContract(contractId);
 
      } catch (error) {
        this.error = 'Failed to delete contract';
        console.error('Error deleting contract:', error)
      } finally {
        this.isDeleteLoading = false
      }
    },

    async updateContract(contract: Contract) {
      this.isUpdateLoading = true;
      this.error = null;

      try {
        await updateContract(contract);

      } catch (error) {
        this.error = 'Failed to update contract';
        console.error('Error updating contract:', error)
      } finally {
        this.isUpdateLoading = false
      }
    },

    /**
     * Loads contracts with pagination support.
     * @param page The page number to load.
     * @param pageSize The number of contracts per page.
     * @returns A promise that resolves to an array of contracts for the specified page.
     */
    async loadContractsWithPagination(page: number, pageSize: number = 10)  {
      this.isPaginationLoading = true;
      this.error = null;

      try {
        const response = await fetchPaginatedContracts(page, pageSize);

        this.contracts = response.items;
        this.totalContracts = response.total;
        this.currentPage = page;

      } catch (error) {
        this.error = 'Failed to load contracts with pagination';
        console.error('Error loading contracts with pagination:', error);
        return [];
      } finally {
        this.isPaginationLoading = false;
      }
    }
  },
})
