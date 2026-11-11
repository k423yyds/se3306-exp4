# AI 使用声明

本实验使用 AI 工具（豆包）辅助完成，遵循指导书的 AI 使用规范。现如实声明如下：

## 一、AI 使用范围

| 用途 | 具体内容 |
|---|---|
| 概念解释 | 组合式 API（`ref` / `reactive` / `computed` / `watch`）、单文件组件、组件通信（props / emits / provide / inject / 插槽）、Vue Router 动态路由与守卫、Pinia 与持久化、Axios 三态封装等机制讲解 |
| 报错排查 | Vue 单文件组件「Invalid end tag」（`<section>` 被写成 `</article>`）导致详情页 500 与动态模块加载失败；解构 `props` 丢失响应性；刷新详情页浏览量漏计；远端数据覆盖本地新增文章 |
| 代码生成 | 任务一至六的代码按指导书的关键代码组织方式生成（组件拆分、store、api、路由、三态组件），并在此基础上做界面美化 |
| 运行与验证 | 由本人在本机安装依赖、启动 dev、逐任务在浏览器自检、执行 `pnpm type-check` / `pnpm lint` / `pnpm build` / `pnpm preview` 并截图 |

## 二、使用 AI 生成整模块代码的清单

按指导书要求，列出 AI 生成（或大幅协助生成）的模块：

| 模块/文件 | 说明 |
|---|---|
| `src/types.ts`、`src/api/posts.ts` | 类型定义与请求层（延迟模拟 + 一次性失败开关） |
| `src/stores/blog.ts` | Pinia setup store：文章、点赞、浏览、评论、三态、持久化 |
| `src/router/index.ts` | 路由表、参数正则约束、兜底 404、`beforeEach` 计浏览量 |
| `src/components/PostItem.vue` | 文章卡片，`defineProps` + `defineEmits`（任务一、三） |
| `src/components/CommentSection.vue` | 评论区列表与表单（任务五） |
| `src/components/LoadingState.vue`、`ErrorState.vue`、`EmptyState.vue` | 三态与空状态组件（任务二、六） |
| `src/components/AppHeader.vue`、`AppFooter.vue` | 导航与页脚，页脚用 `inject` 读取 `provide` 的站点信息 |
| `src/views/HomeView.vue`、`PostDetailView.vue`、`PostNewView.vue`、`AboutView.vue`、`NotFoundView.vue` | 五个页面（任务一至六） |
| `src/App.vue`、`src/main.ts`、`src/assets/main.css` | 布局外壳、Pinia 注册、全局设计变量 |
| `public/posts.json` | 6 篇初始文章数据 |
| `README.md`、`实验报告.md`、`ai-review.md`、本声明 | AI 起草 + 本人校对，截图与命令输出均来自实际运行 |
| 全部页面的样式 | 实验二、三风格的卡片美化（indigo 主色、圆角卡片、胶囊按钮） |

## 三、本人自行完成的工作

- 环境安装与配置：Node.js / pnpm 版本核对、`pnpm install` 依赖安装（含 `pinia-plugin-persistedstate`、`axios`）；
- 全程运行验证：`pnpm dev` 启动，逐任务在浏览器自检（点赞与刷新、搜索与空态、详情与 404、发布与评论、加载中/失败/重试、关于页）；
- 截图：在本机 Microsoft Edge 里全屏截取，只截页面内容（不含桌面与任务栏），任务一至六验证图与最终成品图共 23 张；
- 界面美化方案确认与微调（配色、卡片、按钮样式）；
- Git 提交管理（`feat:` / `docs:` 提交信息成体系）；
- 本报告的撰写与数据核对（版本号、构建输出、截图引用逐条核对）。

## 四、声明

- 任务一至六的全部代码均已在本机真实运行并通过自检，截图均为实际运行结果，无虚构；
- 部署（指导书列为"尤佳"）未做，报告中已如实标注，仅完成本地 `pnpm preview` 生产预览验证；
- Gitee 公开仓库已在本地完成 git 提交，待推送；
- 以上内容如有不实，愿按课程规定接受处理。
