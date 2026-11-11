export interface Post {
  id: number
  title: string
  category: string
  date: string
  content: string
}

export interface CommentItem {
  id: number
  postId: number
  author: string
  content: string
  date: string
}
