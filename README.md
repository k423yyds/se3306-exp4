# 实验四：Vue3 博客迁移

《实验四_Vue3博客迁移》任务一至任务六的实现：把实验三的 Next.js 博客用 Vue 3 重写一遍，功能一致（列表、搜索、点赞与浏览量、详情、发布、评论、加载与错误三态），并补充了组件化拆分、Pinia 持久化与路由守卫。

## 技术栈

- Vue 3.5（`<script setup>` + TypeScript）
- Vue Router 5（动态路由 + `beforeEach` 守卫 + 路由懒加载）
- Pinia 4 + `pinia-plugin-persistedstate`（状态持久化到 localStorage）
- Axios 1.21（请求封装 + 0.5~1 秒延迟模拟 + 一次性失败开关）
- Vite 8（开发与构建）

## 本地运行

```bash
pnpm install        # 安装依赖
pnpm dev            # 开发模式 http://localhost:5173
pnpm build          # 类型检查（vue-tsc）+ 生产构建
pnpm preview        # 预览构建产物 http://localhost:4173
pnpm lint           # oxlint + eslint
```

> 依赖 Node.js 20+ 与 pnpm。若 5173 端口被占用，先关闭旧的 dev 进程再启动（项目配置了 `strictPort`）。

## 功能对照（任务一至六）

| 任务 | 实现位置 |
|---|---|
| 任务一 跑起来与组件化 | `src/views/HomeView.vue`、`src/components/PostItem.vue`（props + `v-for` 复用） |
| 任务二 列表与搜索 | `HomeView.vue` 的 `keyword` + `computed(filtered)`、`components/EmptyState.vue` |
| 任务三 点赞与浏览量 | `components/PostItem.vue`（`defineEmits`）、`stores/blog.ts`（`likePost` / `viewPost` + `persist`） |
| 任务四 详情与路由 | `router/index.ts`（`/posts/:id(\\d+)`、`/:pathMatch(.*)*`）、`views/PostDetailView.vue` |
| 任务五 发布与评论 | `views/PostNewView.vue`、`components/CommentSection.vue`、`stores/blog.ts`（`addPost` / `addComment`） |
| 任务六 加载与错误 | `api/posts.ts`（延迟 + 失败开关）、`components/LoadingState.vue` / `ErrorState.vue`、`stores/blog.ts`（`status` 三态） |

## 页面清单

- `/` 首页：分类筛选 + 搜索 + 加载三态 + 发布入口 + 模拟失败入口
- `/posts/:id` 文章详情：正文、点赞、浏览量、删除、评论区
- `/new` 发布页：标题/分类/正文，空标题校验，提交中禁用按钮
- `/about` 关于页：站点说明、作者卡、技术栈、与 Next.js 版的区别
- 任意不存在路径 → 404 页

## 说明

- 数据保存在浏览器 `localStorage`（key：`lab4-blog`），清空浏览器数据后回到初始 6 篇文章；
- 首页底部「模拟一次请求失败」用于复现任务六的错误态与重试，正式使用时可删除该按钮与 `simulateNextFailure`；
- 换真实后端只需改 `src/api/posts.ts` 与 `stores/blog.ts` 的读写实现，页面与组件不用动；
- 实验报告见 [`实验报告.md`](./实验报告.md)，AI 使用情况见 [`AI使用声明.md`](./AI使用声明.md)，代码自查见 [`ai-review.md`](./ai-review.md)；
- 公开仓库：https://github.com/k423yyds/se3306-exp4 ；
- 线上地址：https://k423yyds.github.io/se3306-exp4/ （GitHub Pages，push 到 `master` 由 `.github/workflows/deploy.yml` 自动构建发布）。
