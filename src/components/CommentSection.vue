<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBlogStore } from '@/stores/blog'

const props = defineProps<{ postId: number }>()
const blog = useBlogStore()

const comments = computed(() => blog.commentsOf(props.postId))

const author = ref('')
const content = ref('')
const error = ref('')

function submit() {
  if (!content.value.trim()) {
    error.value = '评论内容不能为空'
    return
  }
  error.value = ''
  blog.addComment({
    postId: props.postId,
    author: author.value.trim(),
    content: content.value.trim(),
  })
  content.value = ''
}
</script>

<template>
  <section class="comments card">
    <h2>评论 <span class="count">{{ comments.length }}</span></h2>

    <ul v-if="comments.length" class="list">
      <li v-for="item in comments" :key="item.id" class="comment">
        <div class="row">
          <span class="avatar">{{ (item.author || '匿').slice(0, 1) }}</span>
          <div class="body">
            <div class="head">
              <strong>{{ item.author }}</strong>
              <span class="muted date">{{ item.date }}</span>
            </div>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </li>
    </ul>

    <p v-else class="no-comment muted">还没有评论，来说两句吧。</p>

    <form class="form" @submit.prevent="submit">
      <input v-model="author" type="text" maxlength="20" placeholder="你的昵称（可留空）" />
      <textarea v-model="content" rows="3" maxlength="300" placeholder="写点什么…" />
      <div class="form-foot">
        <span class="error">{{ error }}</span>
        <button class="btn btn-primary" type="submit">发表评论</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.comments {
  padding: 24px 26px 22px;
}

h2 {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 17px;
  font-weight: 700;
}

.count {
  display: inline-grid;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  place-items: center;
  border-radius: 999px;
  background: var(--brand-soft);
  color: var(--brand);
  font-size: 12px;
  font-weight: 700;
}

.list {
  display: grid;
  gap: 14px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.comment {
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #fcfcff;
}

.row {
  display: flex;
  gap: 10px;
}

.avatar {
  display: grid;
  width: 32px;
  height: 32px;
  flex: none;
  place-items: center;
  border-radius: 50%;
  background: var(--brand-soft);
  color: var(--brand);
  font-size: 13px;
  font-weight: 700;
}

.body {
  flex: 1;
}

.head {
  display: flex;
  gap: 8px;
  align-items: baseline;
  font-size: 13px;
}

.date {
  font-size: 12px;
}

.body p {
  margin-top: 4px;
  color: #374151;
  font-size: 14px;
  white-space: pre-wrap;
}

.no-comment {
  margin-top: 14px;
  font-size: 13px;
}

.form {
  display: grid;
  gap: 10px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px dashed var(--border);
}

.form input,
.form textarea {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  outline: none;
  background: #fff;
  color: var(--text);
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.form input:focus,
.form textarea:focus {
  border-color: #c7c2f5;
  box-shadow: 0 0 0 3px #f1efff;
}

.form-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.error {
  color: var(--danger);
  font-size: 12px;
}
</style>
