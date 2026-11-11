# AI 使用声明

## 一、使用的 AI 工具

| 工具 | 用途 |
| --- | --- |
| 豆包（Doubao）工作模式 | 项目脚手架搭建、代码生成与修改、报错排查、报告与文档整理 |

使用方式为对话式协作：由本人提出每一步的需求与验收标准，AI 给出可直接运行的代码与命令，本人执行、观察结果并提出修改意见。

## 二、AI 参与的范围

| 模块 / 文件 | AI 参与方式 | 说明 |
| --- | --- | --- |
| `package.json`、`vite.config.ts`、`tsconfig*.json` | 生成 + 配置 | 由 `create-vue` 脚手架生成，AI 协助删除开发工具插件、调整项目配置 |
| `src/stores/blog.ts` | 生成 | Pinia setup store：文章、点赞、浏览量、评论、三态加载、持久化字段 |
| `src/api/posts.ts` | 生成 | Axios 实例、0.5~1 秒延迟模拟、失败开关 |
| `src/router/index.ts` | 生成 | 路由表、`/posts/:id(\\d+)` 参数约束、`beforeEach` 守卫计浏览量 |
| `src/components/PostItem.vue` | 生成 | props 定义、`emit` 点赞事件、摘要 computed、卡片样式 |
| `src/components/CommentSection.vue` | 生成 | 评论列表、表单校验、写入 store |
| `src/components/LoadingState.vue`、`ErrorState.vue`、`EmptyState.vue` | 生成 | 三态与空状态组件，`ErrorState` 通过 `emit` 暴露重试 |
| `src/components/AppHeader.vue`、`AppFooter.vue` | 生成 | 导航与页脚，页脚通过 `inject` 读取站点信息 |
| `src/views/*.vue` | 生成 | 首页（搜索、分类、三态）、详情、发布、关于、404 |
| `src/App.vue`、`src/main.ts`、`src/assets/main.css` | 生成 | 布局外壳、`provide`、Pinia 注册、全局设计变量 |
| `public/posts.json` | 生成 | 6 篇初始文章数据 |
| `README.md`、`实验报告.md`、`ai-review.md`、本声明 | AI 起草 + 本人校对 | 报告中的截图与命令输出均来自实际运行 |
| 截图 | 本人操作 | 用浏览器逐页操作并截取页面内容 |

## 三、本人自行完成的工作

1. 按指导书逐条确认六个任务的验收标准，并检查 AI 给出的实现是否覆盖（列表、搜索、点赞持久化、详情路由、发布评论、加载三态）。
2. 在本机执行 `pnpm install`、`pnpm dev`、`pnpm build`、`pnpm lint`、`pnpm preview`，逐条验证运行结果。
3. 在浏览器中逐项操作六个功能并截图：点赞后刷新、搜索与空结果、详情与 404、发布与评论、加载中/失败/重试。
4. 校对报告中的命令输出、版本号与截图引用，确认与实际运行一致。
5. 完成实验体会与自查清单的最终确认。

## 四、声明

1. 本实验的源代码由 AI 辅助生成，本人已完整阅读、运行并验证，能够说明主要模块的职责与关键实现思路。
2. 报告中所有截图、构建日志与运行结果均来自本机实际运行，未使用伪造数据。
3. 涉及 Vue 3、Vue Router、Pinia 的用法参考官方文档（cn.vuejs.org、router.vuejs.org、pinia.vuejs.org），未直接复制他人项目代码。
4. 若后续对代码有修改，会在提交记录中如实体现，不将他人成果记为本人独立完成。
