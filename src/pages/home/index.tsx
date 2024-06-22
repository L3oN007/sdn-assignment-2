import { Star } from "lucide-react"
import { Link } from "react-router-dom"

const HomePage = () => {
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* !Watch Card */}
            <Link to="/watches/1232">
              <div className="group cursor-pointer space-y-4 rounded-xl border bg-white p-3">
                <div className="relative aspect-square rounded-xl bg-gray-100">
                  <img
                    src="https://media.rolex.com/image/upload/q_auto:best/f_auto/c_limit,w_640/v1708407060/rolexcom/new-watches/2023/family-collection/submariner/landing-page/roller/professional-watches-submariner-green-bezel-roller-m126610lv-0002-2009jva-001-xl-frog"
                    alt="Image"
                    className="aspect-square rounded-md object-cover"
                  />
                </div>
                <div className="border-b">
                  <div className="mb-4">
                    <p className="text-lg font-semibold">Rolex Submariner</p>
                    <p className="line-clamp-2 min-h-10 text-sm text-gray-500">
                      Rolex abc
                    </p>
                  </div>
                  {/* !Price */}
                  <h3 className="mb-2 text-xl font-semibold"> $ 12000</h3>
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
                          stroke-width="2"
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>

                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Brand</p>

                        <p className="font-medium">Rolex</p>
                      </div>
                    </div>
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-watch"
                      >
                        <circle cx="12" cy="12" r="6" />
                        <polyline points="12 10 12 12 13 13" />
                        <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" />
                        <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" />
                      </svg>

                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Automatic</p>

                        <p className="font-medium">Yes</p>
                      </div>
                    </div>
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <Star className="size-4 " />

                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Avg Star</p>

                        <p className="font-medium">123123</p>
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
            {/* Watch card */}
          </div>
          {/* Watch section */}
        </div>
      </div>
    </main>
  )
}

export default HomePage
