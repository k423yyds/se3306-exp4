<script setup lang="ts">
import { inject } from 'vue'

const site = inject<{ name: string; author: string; since: number; framework: string }>('siteInfo')
</script>

<template>
  <footer class="site-footer">
    <p>
      © {{ site?.since }} {{ site?.name }} · {{ site?.author }} · 由 {{ site?.framework }} 重写
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  background: #fff;
  padding: 22px 20px;
  color: var(--muted);
  font-size: 13px;
  text-align: center;
}
</style>
