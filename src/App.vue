<script setup lang="ts">
import { provide, reactive } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

// provide / inject：向所有后代组件共享站点信息
const siteInfo = reactive({
  name: '我的博客',
  author: '软件工程 24 级',
  since: 2026,
  framework: 'Vue 3',
})

provide('siteInfo', siteInfo)
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="container">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}

.container {
  flex: 1;
}
</style>
