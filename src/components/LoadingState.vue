<script setup lang="ts">
withDefaults(defineProps<{ message?: string }>(), { message: '正在载入……' })
</script>

<template>
  <div class="loading-wrap">
    <p class="loading-text">{{ message }}</p>
    <div v-for="n in 3" :key="n" class="skeleton card">
      <div class="line w-30" />
      <div class="line w-80 tall" />
      <div class="line w-60" />
    </div>
  </div>
</template>

<style scoped>
.loading-wrap {
  display: grid;
  gap: 14px;
}

.loading-text {
  color: var(--muted);
  font-size: 13px;
  text-align: center;
}

.skeleton {
  padding: 20px;
  animation: breathe 1.4s ease-in-out infinite;
}

.line {
  height: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  background: #edeef5;
}

.line:last-child {
  margin-bottom: 0;
}

.tall {
  height: 20px;
}

.w-30 {
  width: 30%;
}

.w-60 {
  width: 60%;
}

.w-80 {
  width: 80%;
}

@keyframes breathe {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}
</style>
