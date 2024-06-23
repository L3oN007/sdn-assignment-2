import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { WatchDetailResponseType } from "@/schemas/watch.schema"

import api from "@/lib/api"

import ErrorPage from "@/pages/error"
import CommentSection from "@/pages/watch-detail/comment-section"
import WatchDetailSection from "@/pages/watch-detail/watch-detail-section"

import { Loader } from "@/components/loader"

export default function WatchDetailPage() {
  const { id } = useParams()
  const {
    data: watch,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["watch", id],
    queryFn: async () => {
      const { data } = await api.get<WatchDetailResponseType>(`/watches/${id}`)
      return data.response
    },
  })

  if (isLoading) {
    return null
  }

  if (!watch) return <ErrorPage />

  if (isError) {
    return <ErrorPage />
  }

  return (
    <div className="my-16 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative items-center px-4 sm:px-6 lg:px-8">
          <Loader loading={isFetching}>
            <WatchDetailSection
              watchName={watch?.watchName}
              watchDescription={watch?.watchDescription}
              automatic={watch?.automatic}
              avgRating={watch?.avgRating}
              brandName={watch?.brand.brandName}
              image={watch?.image}
              price={watch?.price}
            />
          </Loader>

          <CommentSection comments={watch?.comments} />
        </div>
      </div>
    </div>
  )
}
