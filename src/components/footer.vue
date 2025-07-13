<template>
  <footer class="bg-white rounded-lg shadow-sm m-4 dark:bg-black">
      <div class="text-center">
        <el-tooltip :content="isDark ? t('change-light') : t('change-dark')" placement="top">
          <button class="icon-btn mx-2 !outline-none " @click="toggleDark()">
            <IconCloudMoonBold v-if="isDark" class="icon-footer" />
            <IconSunHorizonBold v-else class="icon-footer" />
          </button>
        </el-tooltip>

        <el-tooltip :content="t('change-lang')" placement="top">
          <button class="icon-btn mx-2 !outline-none" @click="toggleLocales()">
            <IconLanguage class="icon-footer" />
          </button>
        </el-tooltip>
      </div> 
  </footer>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '@/utils/dark';
import { useI18n } from 'vue-i18n';
import { ElTooltip } from 'element-plus';
import IconCloudMoonBold from '@/components/icons/IconCloudMoonBold.vue';
import IconSunHorizonBold from '@/components/icons/IconSunHorizon.vue';
import IconLanguage from '@/components/icons/Language.vue';


const { t, availableLocales, locale } = useI18n();
const toggleLocales = () => {
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];

  localStorage.setItem('locale', locale.value);
};

</script>

<style lang="scss">
.icon-footer {
  font-size: 1.3em;
}
</style>