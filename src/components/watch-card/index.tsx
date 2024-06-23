import { Star, Watch } from "lucide-react"
import { Link } from "react-router-dom"

type Props = {
  _id: string
  watchName: string
  image: string
  price: number
  automatic: boolean
  watchDescription: string
  brandName: string
  avgRating: number
}
export default function WatchCard({
  _id,
  watchName,
  image,
  price,
  automatic,
  watchDescription,
  brandName,
  avgRating,
}: Props) {
  return (
    <Link to={`/watch/${_id}`}>
      <div className="group cursor-pointer space-y-4 rounded-xl border bg-white p-3">
        <div className="relative aspect-square rounded-xl bg-gray-100">
          <img
            src={image}
            alt="Image"
            className="aspect-square rounded-md object-cover"
          />
        </div>
        <div className="border-b">
          <div className="mb-4">
            <p className="text-lg font-semibold">{watchName}</p>
            <p className="line-clamp-2 min-h-10 text-sm text-gray-500">
              {watchDescription}
            </p>
          </div>
          {/* !Price */}
          <h3 className="mb-2 text-xl font-semibold"> $ {price}</h3>
        </div>
        <div className="w-full">
          <div className="my-4 flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="size-4 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Brand</p>

                <p className="font-medium">{brandName}</p>
              </div>
            </div>
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <Watch className="size-5" />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Automatic</p>

                <p className="font-medium">{automatic ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <Star className="size-4 " />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Avg Rating</p>

                <p className="font-medium">{avgRating.toFixed(1)} / 3</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mb-2 w-full rounded-full bg-gray-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            View details
          </button>
        </div>
      </div>
    </Link>
  )
}
