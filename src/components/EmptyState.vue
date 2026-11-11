<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <section class="empty card">
    <div class="icon" aria-hidden="true">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.4 15.4 20 20" stroke-linecap="round" />
      </svg>
    </div>
    <h3>{{ title || '没有找到文章' }}</h3>
    <p class="hint">
      <slot>换个关键词试试。</slot>
    </p>
  </section>
</template>

<style scoped>
.empty {
  padding: 48px 24px;
  text-align: center;
}

.icon {
  display: grid;
  width: 60px;
  height: 60px;
  margin: 0 auto 14px;
  place-items: center;
  border-radius: 50%;
  background: var(--brand-soft);
  color: var(--brand);
}

h3 {
  font-size: 17px;
  font-weight: 700;
}

.hint {
  margin-top: 6px;
  color: var(--muted);
  font-size: 14px;
}
</style>
