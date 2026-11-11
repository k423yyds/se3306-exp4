import axios from 'axios'
import type { Post } from '@/types'

/**
 * 模拟后端接口：数据放在 public/posts.json，走真实的 HTTP 请求，
 * 再用 sleep 模拟 0.5~1 秒的网络延迟。
 */
const http = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
})

let failOnce = false

/** 调试用：让下一次请求打到一个不存在的地址，从而走 catch 分支 */
export function simulateNextFailure() {
  failOnce = true
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface PostsResponse {
  posts: Post[]
}

export async function getPosts(): Promise<Post[]> {
  const delay = 500 + Math.random() * 500
  const url = failOnce ? 'posts-missing.json' : 'posts.json'
  failOnce = false
  await sleep(delay)
  const { data } = await http.get<PostsResponse>(url)
  return data.posts
}
