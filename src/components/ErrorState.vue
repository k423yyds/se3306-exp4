<script setup lang="ts">
withDefaults(defineProps<{ message?: string }>(), { message: '载入失败，请稍后再试' })

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <section class="error card">
    <div class="icon" aria-hidden="true">!</div>
    <h3>{{ message }}</h3>
    <p class="hint">请检查网络后重试，你的文章不会丢失。</p>
    <button class="btn btn-primary retry" type="button" @click="emit('retry')">重试</button>
  </section>
</template>

<style scoped>
.error {
  padding: 44px 24px;
  text-align: center;
}

.icon {
  display: grid;
  width: 52px;
  height: 52px;
  margin: 0 auto 12px;
  place-items: center;
  border-radius: 50%;
  background: #fef2f2;
  color: var(--danger);
  font-size: 22px;
  font-weight: 800;
}

h3 {
  font-size: 17px;
  font-weight: 700;
}

.hint {
  margin-top: 6px;
  color: var(--muted);
  font-size: 13px;
}

.retry {
  margin-top: 18px;
}
</style>
