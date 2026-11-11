# ai-review.md：AI 审码记录

> 本文件是本次实验的代码自查记录。三件套 = 本文件 + `AI使用声明.md` + 运行/截图证据（`实验截图/`）。

## 一、审查范围

审查覆盖任务一至六的全部源码：`src/views/`（Home、PostDetail、PostNew、About、NotFound）、`src/components/`（PostItem、CommentSection、LoadingState、ErrorState、EmptyState、AppHeader、AppFooter）、`src/stores/blog.ts`、`src/api/posts.ts`、`src/router/index.ts`、`src/App.vue`、`src/main.ts`、`src/assets/main.css`、`src/types.ts`、`public/posts.json` 以及配置文件（`vite.config.ts`、`tsconfig*.json`、`index.html`、`package.json`）。

## 二、对照合格线逐条核对

| 合格线 | 核对结果 | 证据 |
|---|---|---|
| 能跑起来 | ✅ `pnpm dev`（5173）、`pnpm preview`（4173）均正常 | 1.1_env、7.4_preview |
| 功能齐全：列表、搜索、详情、发布、评论、404 | ✅ 全部实现并实测 | 1.1_home、2.1_search、4.1_detail、5.2_new_post、5.3_comment、4.2_404 |
| 每个页面都有交代：空态、加载态、错误态 | ✅ 空态（搜索无结果）、加载态（骨架屏）、错误态（重试卡片） | 2.2_empty、6.1_loading、6.2_error |
| 子组件不直接改数据，事件上抛 | ✅ `PostItem` 只有 `emit('like')`，计数由 store 负责 | `PostItem.vue`、`blog.ts` |
| 刷新不丢：点赞、浏览、评论、发布 | ✅ store `persist` 只存业务字段 | 3.1_persist、5.4_comment_persist |
| 代码干净：类型清楚、控制台无报错、README 写清 | ✅ `vue-tsc` 0 错误、`lint` 0 warning 0 error、build 通过 | 7.4_build、README |

## 三、diff 摘要（与指导书基础实现 / 实验三版本的差异）

1. **数据来源**：指导书示例用内存数组或组件内 `ref`；本项目把数据放在 `public/posts.json`，用 Axios 真实请求并通过 `sleep` 模拟 0.5~1 秒延迟，更贴近任务六的"接口"语境。
2. **持久化范围**：只持久化 `posts / likes / views / liked / comments / loaded`，运行时状态（`status` / `errorText` / `loadingText`）不落盘，避免刷新后卡在加载或错误状态。
3. **浏览量位置**：指导书未规定实现位置；本项目放在 `router.beforeEach`，覆盖刷新、直达、跳转三种入口，而不是写在详情组件里。
4. **远端与本地合并**：`reload()` 保留"远端不存在、本地新增"的文章，避免重新拉取接口后把用户发布的文章冲掉（这是指导书示例没有考虑的场景）。
5. **路由参数约束**：`:id(\\d+)` 只接受数字，`/posts/abc` 落到 404，而不是进入详情页显示空白。
6. **界面**：在指导书基础样式上做了卡片风格美化（浅灰背景、白色卡片、indigo 主色、胶囊分类），与实验二、实验三保持一致。

## 四、运行验证记录

| 验证项 | 命令/操作 | 结果 |
|---|---|---|
| 依赖安装 | `pnpm install` | ✅ 296 个包安装成功 |
| 开发服务器 | `pnpm dev`（端口 5173） | ✅ `ready`，页面正常，热更新生效 |
| 类型检查 | `pnpm type-check`（`vue-tsc --build`） | ✅ 无输出，退出码 0 |
| Lint | `pnpm lint`（oxlint + eslint） | ✅ `Found 0 warnings and 0 errors.` |
| 生产构建 | `pnpm build` | ✅ 124 个模块，473ms，四个页面独立 chunk |
| 生产预览 | `pnpm preview`（端口 4173） | ✅ 首页、详情、关于、404 均可访问 |
| 功能自检 | 浏览器逐项 | ✅ 点赞→刷新、搜索→空态、详情→404、发布→评论→刷新、加载→失败→重试（截图 23 张见 `实验截图/`） |

## 五、审查发现的问题与处理

| 问题 | 处理 |
|---|---|
| 详情页 500，报 `Invalid end tag`，动态导入模块加载失败 | `PostDetailView.vue` 的 `<section>` 结束标签误写成 `</article>`，改为 `</section>` 后恢复 |
| 解构 `props` 后点赞数字不刷新 | 改为直接读 `props.post`，保持属性访问链，响应式追踪不中断 |
| 首版点赞刷新丢失 | 计数从组件内 `ref` 迁到 Pinia store，并开启 `persist` |
| 重新拉取接口后，自己发布的文章被覆盖 | `reload()` 改为「远端数据 + 本地新增（id 不在远端中）」合并 |
| 直接刷新详情页浏览量不增加 | 浏览量从详情组件移到 `router.beforeEach` |
| 首次进入详情闪一下"文章不存在" | 模板条件改为「未加载完成时显示 loading」，仅 `ready` 且找不到才提示不存在 |
| 终端 `pnpm` 命令不可用（PATH 未包含全局 npm bin） | 使用 `C:\Users\cyj\AppData\Roaming\npm\pnpm.cmd` 绝对路径执行，功能不受影响 |

## 六、审查结论

代码符合指导书任务一至六的要求：组件拆分合理（`PostItem` 只渲染与上抛事件，不持有业务状态）、状态单一来源（点赞与浏览只在 store 中维护）、通信方式齐全（props/emits、provide/inject、插槽均有实际用例）、路由与守卫职责清晰、三态闭环完整（加载/失败/重试/恢复）、持久化边界正确（只存业务字段）。类型检查、lint、构建、生产预览全部通过，运行验证证据齐全（23 张截图 + 构建日志）。

待办：Gitee 公开仓库推送（需仓库地址与授权）；部署（"尤佳"）未做，如后续需要，可直接把 `dist` 目录部署到任意静态托管平台。
