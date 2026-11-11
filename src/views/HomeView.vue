<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useBlogStore } from '@/stores/blog'
import { simulateNextFailure } from '@/api/posts'
import PostItem from '@/components/PostItem.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'
import EmptyState from '@/components/EmptyState.vue'

const blog = useBlogStore()

const keyword = ref('')
const activeCategory = ref('全部')

// computed：搜索词或分类变化时自动重算，不需要手动触发
const filtered = computed(() => {
  const kw = keyword.value.trim()
  return blog.sortedPosts.filter((post) => {
    const matchCategory = activeCategory.value === '全部' || post.category === activeCategory.value
    const matchKeyword = !kw || post.title.includes(kw)
    return matchCategory && matchKeyword
  })
})

onMounted(() => {
  blog.ensureLoaded()
})

function simulateFailure() {
  simulateNextFailure()
  blog.reload()
}
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-text">
        <h1>我的博客</h1>
        <p class="subtitle">用 Vue 3 重写一遍，记录一点想法。</p>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <span class="num">{{ blog.posts.length }}</span>
          <span class="label">篇文章</span>
        </div>
        <div class="stat-item">
          <span class="num">{{ blog.totalViews }}</span>
          <span class="label">次阅读</span>
        </div>
        <div class="stat-item">
          <span class="num">{{ blog.totalLikes }}</span>
          <span class="label">个点赞</span>
        </div>
      </div>
    </section>

    <section class="toolbar">
      <label class="search">
        <span class="search-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.4 15.4 20 20" stroke-linecap="round" />
          </svg>
        </span>
        <input v-model="keyword" type="search" placeholder="搜索文章标题…" />
        <button v-if="keyword" class="clear" type="button" @click="keyword = ''">×</button>
      </label>

      <div class="categories">
        <button
          v-for="item in blog.categories"
          :key="item"
          type="button"
          class="chip"
          :class="{ active: activeCategory === item }"
          @click="activeCategory = item"
        >
          {{ item }}
        </button>
      </div>

      <button class="btn refresh" type="button" :disabled="blog.status === 'loading'" @click="blog.reload()">
        {{ blog.status === 'loading' ? '载入中' : '重新载入' }}
      </button>
    </section>

    <LoadingState v-if="blog.status === 'loading'" :message="blog.loadingText" />

    <ErrorState
      v-else-if="blog.status === 'error'"
      :message="blog.errorText"
      @retry="blog.reload()"
    />

    <template v-else>
      <EmptyState v-if="filtered.length === 0" :title="keyword ? '没有匹配的文章' : '这里还没有文章'">
        没有找到标题包含「{{ keyword }}」的文章，换个关键词，或者去写一篇新的。
      </EmptyState>

      <div v-else class="post-list">
        <PostItem
          v-for="post in filtered"
          :key="post.id"
          :post="post"
          :likes="blog.likesOf(post.id)"
          :views="blog.viewsOf(post.id)"
          :liked="Boolean(blog.liked[post.id])"
          @like="blog.likePost"
        />
      </div>
    </template>

    <p class="dev-tip">
      接口演示：<button type="button" class="link" @click="simulateFailure">模拟一次请求失败</button>
    </p>
  </div>
</template>

<style scoped>
.home {
  display: grid;
  gap: 22px;
}

.hero {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: flex-end;
  justify-content: space-between;
  padding: 26px 26px 24px;
  border: 1px solid #e6e4f7;
  border-radius: 20px;
  background:
    radial-gradient(1200px 200px at 100% 0, #ece9ff 0%, transparent 60%),
    linear-gradient(180deg, #fbfbfe 0%, #ffffff 100%);
}

.hero-text h1 {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.4px;
}

.subtitle {
  margin-top: 4px;
  color: var(--muted);
  font-size: 14px;
}

.hero-stats {
  display: flex;
  gap: 26px;
}

.stat-item {
  display: grid;
  gap: 2px;
  justify-items: center;
}

.num {
  font-size: 22px;
  font-weight: 800;
  color: var(--brand);
  line-height: 1.2;
}

.label {
  color: var(--muted);
  font-size: 12px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.search {
  position: relative;
  display: flex;
  flex: 1 1 240px;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  transition: border-color 0.15s ease;
}

.search:focus-within {
  border-color: #c7c2f5;
  box-shadow: 0 0 0 3px #f1efff;
}

.search-icon {
  display: inline-flex;
  margin-right: 8px;
  color: #9ca3af;
}

.search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text);
  font-size: 14px;
}

.search input::-webkit-search-cancel-button {
  display: none;
}

.clear {
  border: 0;
  background: transparent;
  color: #9ca3af;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  height: 34px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: #fff;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

.chip:hover {
  border-color: #d9d5f6;
  color: var(--brand);
}

.chip.active {
  border-color: var(--brand);
  background: var(--brand);
  color: #fff;
  font-weight: 600;
}

.refresh {
  height: 36px;
  font-size: 13px;
}

.refresh:disabled {
  color: #9ca3af;
  cursor: default;
}

.post-list {
  display: grid;
  gap: 14px;
}

.dev-tip {
  color: #a1a1aa;
  font-size: 12px;
  text-align: right;
}

.link {
  border: 0;
  background: transparent;
  color: #7c7f93;
  font-size: 12px;
  padding: 6px 10px;
  margin: -6px -10px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
