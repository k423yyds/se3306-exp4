<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const router = useRouter()
const blog = useBlogStore()

const title = ref('')
const category = ref('技术')
const content = ref('')
const error = ref('')

const categories = ['技术', '随笔', '生活']

function submit() {
  if (!title.value.trim()) {
    error.value = '标题不能为空'
    return
  }
  error.value = ''
  blog.addPost({
    title: title.value.trim(),
    category: category.value,
    content: content.value.trim(),
  })
  router.push('/')
}
</script>

<template>
  <div class="new-post">
    <section class="card form-card">
      <h1>写文章</h1>
      <p class="muted hint">文章会保存在本地 store 里，刷新页面也不会丢。</p>

      <form class="form" @submit.prevent="submit">
        <label class="field">
          <span class="label">标题</span>
          <input v-model="title" type="text" maxlength="60" placeholder="给文章起个标题" />
          <span class="counter">{{ title.length }}/60</span>
        </label>
        <p v-if="error" class="error">{{ error }}</p>

        <label class="field">
          <span class="label">分类</span>
          <div class="chips">
            <button
              v-for="item in categories"
              :key="item"
              type="button"
              class="chip"
              :class="{ active: category === item }"
              @click="category = item"
            >
              {{ item }}
            </button>
          </div>
        </label>

        <label class="field">
          <span class="label">正文</span>
          <textarea v-model="content" rows="10" maxlength="2000" placeholder="今天想记点什么…" />
          <span class="counter">{{ content.length }}/2000</span>
        </label>

        <div class="actions">
          <button class="btn" type="button" @click="router.push('/')">取消</button>
          <button class="btn btn-primary" type="submit">发布文章</button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
.new-post {
  display: grid;
}

.form-card {
  padding: 28px 28px 24px;
}

h1 {
  font-size: 24px;
  font-weight: 800;
}

.hint {
  margin-top: 4px;
  font-size: 13px;
}

.form {
  display: grid;
  gap: 16px;
  margin-top: 22px;
}

.field {
  display: grid;
  gap: 8px;
}

.label {
  color: #4b5563;
  font-size: 13px;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  outline: none;
  background: #fff;
  color: var(--text);
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

input:focus,
textarea:focus {
  border-color: #c7c2f5;
  box-shadow: 0 0 0 3px #f1efff;
}

.counter {
  color: #a1a1aa;
  font-size: 12px;
  justify-self: end;
}

.chips {
  display: flex;
  gap: 8px;
}

.chip {
  height: 34px;
  padding: 0 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: #fff;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
}

.chip.active {
  border-color: var(--brand);
  background: var(--brand);
  color: #fff;
  font-weight: 600;
}

.error {
  margin: -6px 0 0;
  color: var(--danger);
  font-size: 13px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;
}
</style>
