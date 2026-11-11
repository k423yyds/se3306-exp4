<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import CommentSection from '@/components/CommentSection.vue'
import LoadingState from '@/components/LoadingState.vue'

const route = useRoute()
const router = useRouter()
const blog = useBlogStore()

const id = computed(() => Number(route.params.id))
const post = computed(() => blog.byId[id.value])

const paragraphs = computed(() => post.value?.content.split(/\n+/).filter(Boolean) ?? [])

onMounted(() => {
  blog.ensureLoaded()
})

function remove() {
  if (!post.value) return
  const ok = window.confirm(`确定删除《${post.value.title}》吗？`)
  if (!ok) return
  blog.removePost(post.value.id)
  router.push('/')
}
</script>

<template>
  <div class="detail">
    <RouterLink to="/" class="back">← 返回首页</RouterLink>

    <LoadingState v-if="!post && (blog.status === 'loading' || blog.status === 'idle')" />

    <section v-else-if="post" class="article card">
      <div class="meta">
        <span class="tag">{{ post.category }}</span>
        <span class="muted date">{{ post.date }}</span>
      </div>

      <h1>{{ post.title }}</h1>

      <div class="stats">
        <span>阅读 {{ blog.viewsOf(post.id) }}</span>
        <span>点赞 {{ blog.likesOf(post.id) }}</span>
        <span>评论 {{ blog.commentsOf(post.id).length }}</span>
      </div>

      <div class="content">
        <p v-for="(paragraph, index) in paragraphs" :key="index">{{ paragraph }}</p>
      </div>

      <div class="actions">
        <button
          class="like-btn"
          :class="{ 'is-liked': blog.liked[post.id] }"
          :disabled="Boolean(blog.liked[post.id])"
          type="button"
          @click="blog.likePost(post.id)"
        >
          ♥ {{ blog.liked[post.id] ? '已点赞' : '点赞' }} {{ blog.likesOf(post.id) }}
        </button>
        <button class="btn btn-ghost danger" type="button" @click="remove">删除这篇文章</button>
      </div>
    </section>

    <section v-else class="missing card">
      <h2>文章不存在</h2>
      <p class="muted">你访问的文章可能已经被删除，或者链接写错了。</p>
      <RouterLink to="/" class="btn btn-primary">回到首页</RouterLink>
    </section>

    <CommentSection v-if="post" :post-id="post.id" />
  </div>
</template>

<style scoped>
.detail {
  display: grid;
  gap: 18px;
}

.back {
  color: var(--muted);
  font-size: 13px;
  justify-self: start;
}

.back:hover {
  color: var(--brand);
}

.article {
  padding: 28px 28px 24px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date {
  font-size: 12px;
}

h1 {
  margin: 12px 0 8px;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.3px;
}

.stats {
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
  color: #9ca3af;
  font-size: 12px;
}

.content {
  margin-top: 18px;
  color: #374151;
  font-size: 15px;
  line-height: 1.9;
}

.content p + p {
  margin-top: 14px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px dashed var(--border);
}

.like-btn {
  height: 34px;
  padding: 0 14px;
  border: 1px solid #fecdd3;
  border-radius: 999px;
  background: #fff1f2;
  color: #e11d48;
  font-size: 13px;
  cursor: pointer;
}

.like-btn:disabled {
  cursor: default;
  opacity: 0.85;
}

.danger {
  color: var(--danger);
  font-size: 13px;
}

.danger:hover {
  background: #fef2f2;
}

.missing {
  padding: 44px 28px;
  text-align: center;
}

.missing h2 {
  font-size: 20px;
}

.missing p {
  margin: 8px 0 18px;
}
</style>
