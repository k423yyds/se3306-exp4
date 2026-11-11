# ai-review.md

对本次实验（Vue 3 博客迁移）做一次交付前自查，对照指导书的验收点逐条核验，并记录实际运行中发现的问题与处理。

## 一、对照指导书验收点

| 任务 | 指导书要求 | 实现位置 | 验证证据 | 结论 |
| --- | --- | --- | --- | --- |
| 任务一 | `pnpm dev` 正常，显示文章与点赞按钮 | `views/HomeView.vue`、`components/PostItem.vue` | 1.1_home.png | 通过 |
| 任务一 | 点「点赞」数字加一 | `stores/blog.ts` → `likePost` | 1.2_liked.png | 通过 |
| 任务一 | `PostItem` 接收 props，`Home` 用 `v-for` 渲染 | `PostItem.vue` props + `HomeView.vue` v-for | 1.1_home.png（6 张卡片同一模板） | 通过 |
| 任务二 | 搜索词变化，列表即时过滤 | `keyword` + `computed(filtered)` | 2.1_search.png | 通过 |
| 任务二 | 空结果出现空状态（`v-if`） | `EmptyState.vue` + `v-if` | 2.2_empty.png | 通过 |
| 任务二 | 能解释 computed 与普通函数的区别 | 实验报告 5.2 节 | 报告正文 | 通过 |
| 任务三 | 点赞按钮 `@click` 生效 | `PostItem` `@click="emit('like', post.id)"` | 1.2_liked.png | 通过 |
| 任务三 | 计数存进 store 并 persist，刷新还在 | `persist.pick` 含 `likes/views/liked` | 3.1_persist.png（刷新后仍为 1） | 通过 |
| 任务三 | 能说出点赞一次哪几处界面跟着变 | 实验报告 5.3 节 | 报告正文 | 通过 |
| 任务四 | 列表点标题进详情，地址栏 `/posts/:id` | `router/index.ts` 动态路由 | 4.1_detail.png（`/posts/6`） | 通过 |
| 任务四 | 刷新详情页不丢 | store 持久化 + 路由参数 | 3.1_persist.png | 通过 |
| 任务四 | 乱输地址进 404 | `/:pathMatch(.*)*` → `NotFoundView` | 4.2_404.png（`/posthg`） | 通过 |
| 任务五 | 空标题不能发布 | `PostNewView.vue` 校验 | 5.1_new_error.png | 通过 |
| 任务五 | 发布后列表立刻出现新文章 | `addPost` + `router.push('/')` | 5.2_new_post.png（6→7 篇） | 通过 |
| 任务五 | 评论即时显示，刷新后仍在 | `addComment` + `comments` 持久化 | 5.3、5.4 | 通过 |
| 任务六 | 模拟接口 0.5~1 秒延迟 | `api/posts.ts` `sleep(500 + random*500)` | 6.1_loading.png | 通过 |
| 任务六 | 加载中、成功、失败三种状态都有截图 | `status` 三态 | 6.1、6.2、6.3 | 通过 |
| 任务六 | 失败点「重试」能恢复 | `ErrorState` `emit('retry')` → `reload()` | 6.3_retry_ok.png | 通过 |
| 任务六 | 六步功能全部完成，可整体演示 | 全部页面 | 7.4_preview.png（生产预览） | 通过 |
| 提交 | 源码 + README + 实验报告（截图、AI 声明） | 仓库根目录 | 文件清单 | 通过 |
| 提交 | 部署（尤佳） | — | 未做，报告中已如实说明 | 未做 |

## 二、代码自查要点

1. **响应式边界**：`PostItem` 中不解构 `props`，避免丢失响应性；`computed` 全部基于 `props.post` 读取。
2. **状态单一来源**：点赞数只存在于 store 的 `likes`，组件不保存副本，所以列表卡片、hero 统计、详情页三处读到的是同一个值。
3. **持久化字段收敛**：`persist.pick` 只保留业务数据（`posts/likes/views/liked/comments/loaded`），`status/errorText/loadingText` 不落盘，避免刷新后卡在 loading。
4. **失败可复现且不污染**：失败开关 `failOnce` 只影响下一次请求，请求发出即复位，重试一定走正常地址。
5. **远端与本地合并**：`reload()` 保留本地新增文章（按 id 判断），避免重新拉取接口后把自己发布的文章冲掉。
6. **路由参数约束**：`:id(\\d+)` 只接受数字，`/posts/abc` 落到 404，而不是进入详情页显示空白。
7. **守卫时机**：浏览量累加放在 `router.beforeEach`，刷新详情页也会执行，不会漏计。
8. **构建可分块**：四个页面用 `() => import(...)` 懒加载，构建产物中各自成 chunk。

## 三、实际运行验证

| 命令 | 结果 |
| --- | --- |
| `pnpm install` | 依赖安装成功（pinia 4.1.0 / vue 3.5.45 / vue-router 5.4.0 / axios 1.21.1） |
| `pnpm type-check` | `vue-tsc --build` 无输出，退出码 0 |
| `pnpm lint` | `Found 0 warnings and 0 errors.`，eslint 无输出 |
| `pnpm dev --port 5173` | `VITE v8.3.7 ready in 629 ms`，HTTP 200 |
| `pnpm build` | `✓ 124 modules transformed`，`✓ built in 537ms`，退出码 0 |
| `pnpm preview --port 4173` | 生产产物可正常访问，页面与开发环境一致 |

浏览器端逐项操作（Chrome）：点赞 → 刷新；搜索「缓存」→ 搜「量子力学」；进入 `/posts/6`；访问 `/posthg`；空标题提交；发布新文章；发表评论 → 刷新；点「重新载入」；点「模拟一次请求失败」→ 点「重试」。

## 四、发现的问题与处理

| 序号 | 现象 | 原因 | 处理 |
| --- | --- | --- | --- |
| 1 | 打开 `/posts/6` 时页面停在首页，控制台报 `Failed to fetch dynamically imported module`，开发服务器返回 500 | `PostDetailView.vue` 模板里 `<section>` 被写成了结束标签 `</article>`，Vue 编译器报 `Invalid end tag` | 改为 `</section>`，重新编译后详情页正常 |
| 2 | 点赞后刷新页面，按钮状态丢失（首版） | 只把计数写进组件内的 `ref`，没有进 store，也没有持久化 | 计数统一放进 Pinia store，并开启 `persist` |
| 3 | 重新拉取接口后，自己发布的文章被覆盖 | `reload()` 直接用远端数据整体替换 `posts` | 改为「远端数据 + 本地新增（id 不在远端中）」合并 |
| 4 | 直接刷新详情页时浏览量不增加 | 浏览量写在详情组件里，刷新时组件尚未挂载 | 移到 `router.beforeEach`，导航发生时累加 |
| 5 | `pnpm` 命令在终端中不可用 | 当前终端 `PATH` 未包含全局 npm bin 目录 | 使用 `C:\Users\cyj\AppData\Roaming\npm\pnpm.cmd` 绝对路径执行，功能不受影响 |
| 6 | 首页每次进入都闪一下「文章不存在」 | 首次进入时 `status` 还是 `idle`，`post` 为空 | 模板条件改为「未加载完成时显示 loading」，仅 `ready` 且找不到才提示不存在 |

## 五、遗留与说明

1. 指导书把「部署」列为「尤佳」，本次未做线上部署，只验证了本地生产预览（`pnpm preview`）。
2. 数据存放在浏览器 `localStorage`，换浏览器或清空缓存后回到初始 6 篇文章，属于预期行为。
3. 首页底部保留「模拟一次请求失败」入口，用于复现任务六的失败态，正式使用时可删除该按钮与 `simulateNextFailure`。
