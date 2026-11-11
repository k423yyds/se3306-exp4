<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <div class="bar">
      <RouterLink to="/" class="brand">
        <span class="mark">B</span>
        <span class="name">我的博客</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav-link">首页</RouterLink>
        <RouterLink to="/about" class="nav-link">关于</RouterLink>
        <RouterLink to="/new" class="write-btn">写文章</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
  padding: 14px 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.mark {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 9px;
  background: var(--brand);
  color: #fff;
  font-size: 15px;
  font-weight: 800;
}

.nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-link {
  padding: 6px 12px;
  border-radius: 8px;
  color: var(--muted);
  font-size: 14px;
  transition:
    color 0.15s ease,
    background 0.15s ease;
}

.nav-link:hover {
  background: #f2f3f8;
  color: var(--text);
}

.nav-link.router-link-exact-active {
  background: var(--brand-soft);
  color: var(--brand);
  font-weight: 600;
}

.write-btn {
  height: 34px;
  margin-left: 8px;
  padding: 0 14px;
  border-radius: 9px;
  background: var(--brand);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 34px;
  transition: background 0.15s ease;
}

.write-btn:hover {
  background: var(--brand-dark);
}
</style>
