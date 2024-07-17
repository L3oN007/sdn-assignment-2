import { useState } from "react"

import { CommentType } from "@/schemas/comment.schema"

import { useAuthContext } from "@/contexts/auth-provider"

import EditCommentSection from "@/pages/watch-detail/comment-section/edit-comment-section"
import PostCommentSection from "@/pages/watch-detail/comment-section/post-comment-section"
import RenderCommentSection from "@/pages/watch-detail/comment-section/render-comment-section"

type Props = {
  comments: CommentType[]
}

export default function CommentSection({ comments }: Props) {
  const [editCommentId, setEditCommentId] = useState<string | null>(null)
  const { isAuthenticated, member } = useAuthContext()

  const handleEditComment = (commentId: string) => {
    setEditCommentId(commentId)
  }
  return (
    <section className="bg-white py-8 lg:py-16 antialiased">
      <div className=" mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({comments.length})
          </h2>
        </div>
        <div className="mb-6">
          {isAuthenticated && member?.isAdmin === false && (
            <PostCommentSection />
          )}
          {isAuthenticated !== true && (
            <p>You must be logged in to post a comment</p>
          )}
        </div>
        <div className="">
          {comments.map((comment) => (
            <div className="" key={comment._id}>
              {editCommentId === comment._id ? (
                <EditCommentSection
                  _id={comment._id}
                  updatedAt={comment.updatedAt}
                  content={comment.content}
                  rating={comment.rating}
                  author={comment.author}
                  cancelEdit={() => setEditCommentId(null)}
                />
              ) : (
                <RenderCommentSection
                  key={comment._id}
                  _id={comment._id}
                  content={comment.content}
                  author={comment.author}
                  updatedAt={comment.updatedAt}
                  rating={comment.rating}
                  onEdit={() => handleEditComment(comment._id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
