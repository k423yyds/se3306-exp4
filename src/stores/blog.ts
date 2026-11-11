import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getPosts } from '@/api/posts'
import type { CommentItem, Post } from '@/types'

export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error'

export const useBlogStore = defineStore(
  'blog',
  () => {
    /* ---------------- state ---------------- */
    const posts = ref<Post[]>([])
    const likes = ref<Record<number, number>>({})
    const views = ref<Record<number, number>>({})
    const liked = ref<Record<number, boolean>>({})
    const comments = ref<CommentItem[]>([])

    const loaded = ref(false)
    const status = ref<LoadStatus>('idle')
    const loadingText = ref('')
    const errorText = ref('')

    /* ---------------- getters ---------------- */
    const sortedPosts = computed(() => [...posts.value].sort((a, b) => b.id - a.id))

    const categories = computed(() => ['全部', ...new Set(posts.value.map((p) => p.category))])

    const byId = computed<Record<number, Post>>(() =>
      Object.fromEntries(posts.value.map((p) => [p.id, p])),
    )

    const totalLikes = computed(() =>
      Object.values(likes.value).reduce((sum, n) => sum + (n || 0), 0),
    )

    const totalViews = computed(() =>
      Object.values(views.value).reduce((sum, n) => sum + (n || 0), 0),
    )

    const likesOf = (id: number) => likes.value[id] || 0
    const viewsOf = (id: number) => views.value[id] || 0
    const commentsOf = (id: number) => comments.value.filter((c) => c.postId === id)

    /* ---------------- actions ---------------- */
    function likePost(id: number) {
      if (liked.value[id]) return
      liked.value[id] = true
      likes.value[id] = (likes.value[id] || 0) + 1
    }

    function viewPost(id: number) {
      views.value[id] = (views.value[id] || 0) + 1
    }

    function addPost(input: { title: string; category: string; content: string }) {
      const id = posts.value.reduce((max, p) => Math.max(max, p.id), 0) + 1
      const post: Post = {
        id,
        title: input.title,
        category: input.category,
        content: input.content || '作者很懒，什么都没写。',
        date: new Date().toISOString().slice(0, 10),
      }
      posts.value.push(post)
      return post
    }

    function removePost(id: number) {
      posts.value = posts.value.filter((p) => p.id !== id)
      comments.value = comments.value.filter((c) => c.postId !== id)
    }

    function addComment(input: { postId: number; author: string; content: string }) {
      const id = comments.value.reduce((max, c) => Math.max(max, c.id), 0) + 1
      comments.value.push({
        id,
        postId: input.postId,
        author: input.author || '匿名读者',
        content: input.content,
        date: new Date().toISOString().slice(0, 10),
      })
    }

    /** 拉取接口：把远端数据与本地新增的文章合并，保留已发布的内容 */
    async function reload() {
      status.value = 'loading'
      loadingText.value = '正在载入……'
      errorText.value = ''
      try {
        const remote = await getPosts()
        const localOnly = posts.value.filter((p) => !remote.some((r) => r.id === p.id))
        posts.value = [...remote, ...localOnly]
        loaded.value = true
        status.value = 'ready'
      } catch {
        status.value = 'error'
        errorText.value = '载入失败，请稍后再试'
      } finally {
        loadingText.value = ''
      }
    }

    async function ensureLoaded() {
      if (!loaded.value) await reload()
    }

    return {
      posts,
      likes,
      views,
      liked,
      comments,
      loaded,
      status,
      loadingText,
      errorText,
      sortedPosts,
      categories,
      byId,
      totalLikes,
      totalViews,
      likesOf,
      viewsOf,
      commentsOf,
      likePost,
      viewPost,
      addPost,
      removePost,
      addComment,
      reload,
      ensureLoaded,
    }
  },
  {
    persist: {
      key: 'lab4-blog',
      pick: ['posts', 'likes', 'views', 'liked', 'comments', 'loaded'],
    },
  },
)
