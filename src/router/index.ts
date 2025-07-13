import { createRouter, createWebHistory } from 'vue-router';

import ContractList from '../views/ContractList.vue';


const routes = [
  {
    path: '/',
    name: 'ContractList',
    component: ContractList
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router