// import axios from 'axios'
import service from '@/services/http';
import type { Contract } from '@/types/Contract'
import type { ContractUpdateDto } from '../types/ContractUpdateDto';

export async function fetchAllContracts (): Promise<Contract[]> {
  console.log('Fetching all contracts from the API');

  const res = await service.get('/contract/all')

    //result is an array of contracts
    console.log('Contracts fetched:', res.data);
  return res.data
}

export async function createContract(contract: Contract): Promise<Contract> {
  const res = await service.post('/contract', contract)
  return res.data
}

export async function updateContract(contract: Contract): Promise<Contract> {
  const res = await service.put(`/contract/${contract.id}`, {
    legalEntityName: contract.legalEntityName,
    authorName: contract.authorName,
    description: contract.description
  } as ContractUpdateDto  )
  return res.data
}

export async function deleteContract(id: number): Promise<void> {
  await service.delete(`/contract/${id}`)
}

export async function getContractById(id: number): Promise<Contract> {
  const res = await service.get(`/contract/${id}`)
  return res.data
}

//paginated contracts
export async function fetchPaginatedContracts(page: number, size: number): Promise<{ items: Contract[], total: number }> {
  const res = await service.get('/contract', {
    params: { pageNumber: page, pageSize: size }
  })
  return {
    items: res.data.items,
    total: res.data.total
  }
}
