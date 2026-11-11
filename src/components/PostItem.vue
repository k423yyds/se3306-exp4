<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Post } from '@/types'

const props = defineProps<{
  post: Post
  likes: number
  views: number
  liked: boolean
}>()

const emit = defineEmits<{ like: [id: number] }>()

const excerpt = computed(() => {
  const text = props.post.content.replace(/\s+/g, ' ')
  return text.length > 72 ? `${text.slice(0, 72)}…` : text
})
</script>

<template>
  <article class="post-item card">
    <div class="head">
      <span class="tag">{{ post.category }}</span>
      <span class="date">{{ post.date }}</span>
    </div>

    <RouterLink :to="`/posts/${post.id}`" class="title">
      {{ post.title }}
    </RouterLink>

    <p class="excerpt">{{ excerpt }}</p>

    <div class="foot">
      <span class="stat">阅读 {{ views }}</span>
      <button
        class="like-btn"
        :class="{ 'is-liked': liked }"
        :disabled="liked"
        type="button"
        @click="emit('like', post.id)"
      >
        <span class="heart">♥</span>
        {{ liked ? '已点赞' : '点赞' }} {{ likes }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.post-item {
  padding: 18px 20px;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.post-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px -18px rgba(15, 23, 42, 0.35);
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.date {
  color: #9ca3af;
  font-size: 12px;
}

.title {
  display: block;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.4;
  transition: color 0.15s ease;
}

.title:hover {
  color: var(--brand);
}

.excerpt {
  margin-top: 6px;
  color: var(--muted);
  font-size: 14px;
}

.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px dashed var(--border);
}

.stat {
  color: #9ca3af;
  font-size: 12px;
}

.like-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #e4e5ec;
  border-radius: 999px;
  background: #fbfbfe;
  color: #4b5563;
  font-size: 13px;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    color 0.15s ease;
}

.like-btn:hover:not(:disabled) {
  border-color: #fca5a5;
  background: #fff1f2;
  color: #e11d48;
}

.like-btn .heart {
  color: #e11d48;
  font-size: 14px;
  line-height: 1;
}

.like-btn.is-liked {
  border-color: #fecdd3;
  background: #fff1f2;
  color: #e11d48;
  cursor: default;
}
</style>
