<template>
 <div class="flex flex-col min-h-screen">
    <el-container>
      <el-header class="flex items-center justify-center shadow-md mt-2">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">{{ $t('title') }}</h1>
      </el-header>
      <el-main class="flex-1 min-h-full">
        <div class="my-4 mx-auto max-w-6xl">
          <el-config-provider :locale="locale">
            <router-view></router-view>
          </el-config-provider>
        </div>
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>  
</template>

<script setup lang="ts">
import Footer from '@/components/footer.vue';
import en from 'element-plus/es/locale/lang/en';
import { ElMain, ElConfigProvider, ElContainer, ElHeader, ElFooter } from 'element-plus';


const locale = en;
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
