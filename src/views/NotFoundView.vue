<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="notfound card">
    <p class="code">404</p>
    <h1>页面不存在</h1>
    <p class="muted">你输入的地址没有对应的页面，看看是不是链接写错了。</p>
    <RouterLink to="/" class="btn btn-primary">回到首页</RouterLink>
  </section>
</template>

<style scoped>
.notfound {
  padding: 64px 28px;
  text-align: center;
}

.code {
  color: var(--brand);
  font-size: 54px;
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1;
}

h1 {
  margin-top: 12px;
  font-size: 22px;
  font-weight: 800;
}

.muted {
  margin: 8px 0 20px;
  font-size: 14px;
}
</style>
