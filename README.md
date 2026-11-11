# lab4-blog

实验四：把实验三的 Next.js 博客用 Vue 3 再写一遍。

## 技术栈

- Vue 3.5（`<script setup>` + TypeScript）
- Vue Router 5（动态路由 + `beforeEach` 守卫）
- Pinia 4 + `pinia-plugin-persistedstate`（状态持久化）
- Axios（请求封装，模拟 0.5~1 秒延迟）
- Vite 8（开发与构建）

## 快速开始

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # 类型检查 + 生产构建
pnpm preview    # 预览构建产物，http://localhost:4173
pnpm lint       # oxlint + eslint
```

## 功能

| 功能 | 说明 |
| --- | --- |
| 文章列表 | `v-for` 渲染 `PostItem`，卡片复用 |
| 搜索过滤 | `v-model` 收搜索词，`computed` 过滤标题，空结果有空状态 |
| 分类筛选 | 全部 / 技术 / 随笔 / 生活 |
| 点赞 | 子组件 `emit`，Pinia 计数，`localStorage` 持久化 |
| 浏览量 | 路由守卫 `beforeEach` 里累加 |
| 详情页 | `/posts/:id`，动态路由取参，找不到给 404 |
| 404 | `/:pathMatch(.*)*` 兜底路由 |
| 发布 | `/new` 表单，空标题校验，写入 store 后回列表 |
| 评论 | 详情页即时显示，持久化后刷新不丢 |
| 加载与错误 | Axios + 三态（骨架屏 / 错误 / 重试） |

## 目录

```
src/
├─ api/posts.ts          # Axios 封装 + 延迟 + 失败开关
├─ components/           # PostItem / CommentSection / 三态组件 / 布局
├─ router/index.ts       # 路由表 + 守卫
├─ stores/blog.ts        # Pinia store（文章/点赞/浏览/评论，持久化）
├─ views/                # Home / Detail / New / About / NotFound
└─ assets/main.css       # 全局设计变量
public/posts.json        # 模拟后端数据
实验截图/                 # 实验报告截图
```

## 说明

- 数据保存在浏览器 `localStorage`（key：`lab4-blog`），清空浏览器数据即可恢复初始 6 篇文章。
- 首页底部「模拟一次请求失败」用于演示任务六的错误态与重试。
- 实验报告见 [`实验报告.md`](./实验报告.md)，AI 使用情况见 [`AI使用声明.md`](./AI使用声明.md)。
