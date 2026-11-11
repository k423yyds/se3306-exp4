<script setup lang="ts">
import { inject } from 'vue'

const site = inject<{ name: string; author: string; since: number; framework: string }>('siteInfo')

const stack = ['Vue 3.5', 'Vue Router 5', 'Pinia 4', 'Axios', 'Vite 8', 'TypeScript']
</script>

<template>
  <div class="about">
    <section class="card main">
      <h1>关于这个博客</h1>
      <p>
        这是一个用 Vue 3 重写的个人博客。原型来自实验三的 Next.js 版本，功能一致：文章列表、
        搜索过滤、点赞与浏览量、详情页、发布、评论，以及加载与错误状态。
      </p>
      <p>
        迁移的目的不是把代码抄一遍，而是把同一件事用两套框架的思维方式各做一次，看看差异到底在哪里。
        Next.js 把数据放在服务端，Vue 3 把状态放在客户端 store，两种选择各有取舍。
      </p>

      <div class="author">
        <span class="avatar">V</span>
        <div>
          <strong>{{ site?.author }}</strong>
          <p class="muted">自 {{ site?.since }} 年起记录</p>
        </div>
      </div>
    </section>

    <section class="card stack-card">
      <h2>技术栈</h2>
      <div class="tags">
        <span v-for="item in stack" :key="item" class="tag">{{ item }}</span>
      </div>
    </section>

    <section class="card compare">
      <h2>与 Next.js 版的区别</h2>
      <ul>
        <li><strong>状态：</strong>Pinia store 代替服务端内存数据，刷新靠 localStorage 恢复。</li>
        <li><strong>路由：</strong>Vue Router 的 <code>/posts/:id</code> 代替文件路由，守卫里计浏览量。</li>
        <li><strong>请求：</strong>Axios 拉取 JSON 并模拟延迟，三态由组件自己管理。</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.about {
  display: grid;
  gap: 16px;
}

.card {
  padding: 26px 28px;
}

.main h1 {
  font-size: 26px;
  font-weight: 800;
}

.main p {
  margin-top: 12px;
  color: #374151;
  font-size: 14px;
  line-height: 1.9;
}

.author {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px dashed var(--border);
}

.avatar {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 50%;
  background: var(--brand);
  color: #fff;
  font-weight: 800;
}

.author strong {
  font-size: 14px;
}

.author .muted {
  font-size: 12px;
}

h2 {
  font-size: 17px;
  font-weight: 700;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.compare ul {
  display: grid;
  gap: 10px;
  margin: 14px 0 0;
  padding-left: 18px;
  color: #374151;
  font-size: 14px;
  line-height: 1.8;
}

code {
  padding: 1px 6px;
  border-radius: 5px;
  background: #f2f3f8;
  font-size: 13px;
}
</style>
