import { useQuery } from "@tanstack/react-query"

import { WatchResponseType } from "@/schemas/watch.schema"

import api from "@/lib/api"

import { Loader } from "@/components/loader"
import WatchCard from "@/components/watch-card"

const HomePage = () => {
  const { data: watches, isFetching } = useQuery({
    queryKey: ["watches"],
    queryFn: async () => {
      const { data } = await api.get<WatchResponseType>("/watches")
      return data.response
    },
  })

  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const style = {
    backgroundImage: `url(${backgroundImageUrl})`,
  }
  return (
    <main>
      <div className="overflow-hidden rounded-xl p-4 sm:p-6 lg:p-12">
        <div
          className="relative aspect-square overflow-hidden rounded-xl bg-cover md:aspect-[2.4/1]"
          style={style}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
            <div className="max-w-xs text-3xl font-bold text-white sm:max-w-xl sm:text-5xl lg:text-6xl">
              Explore your favorite watches
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-10">
          <h1 className="text-4xl font-bold">Latest Watch Models</h1>
          {/* !Search */}
          {/* !Search */}

          {/* !Watch Section */}
          <Loader loading={isFetching}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* !Watch Card */}

              {watches !== undefined &&
                watches?.map((watch) => (
                  <WatchCard
                    _id={watch._id}
                    watchName={watch.watchName}
                    image={watch.image}
                    price={watch.price}
                    automatic={watch.automatic}
                    watchDescription={watch.watchDescription}
                    brandName={watch.brand.brandName}
                    avgRating={watch.avgRating}
                  />
                ))}
              {/* Watch card */}
            </div>
          </Loader>
          {/* Watch section */}
        </div>
      </div>
    </main>
  )
}

export default HomePage
