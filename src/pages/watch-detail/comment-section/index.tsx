import { useState } from "react"

import EditCommentSection from "@/pages/watch-detail/comment-section/edit-comment-section"
import PostCommentSection from "@/pages/watch-detail/comment-section/post-comment-section"
import RenderCommentSection from "@/pages/watch-detail/comment-section/render-comment-section"

import { CommentType } from "@/schemas/comment.schema"

type Props = {
  comments: CommentType[]
}

export default function CommentSection({ comments }: Props) {
  const [editCommentId, setEditCommentId] = useState<string | null>(null)

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
          <PostCommentSection />
        </div>
        <div className="">
          {comments.map((comment) => (
            <div className="" key={comment._id}>
              {editCommentId === comment._id ? (
                <EditCommentSection />
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
