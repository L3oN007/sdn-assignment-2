import { Link } from "react-router-dom"

export default function ErrorPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto min-h-[80vh] max-w-screen-xl px-4 py-8 lg:px-6 lg:py-40">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-black lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Something's when wrong.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Sorry, something went wrong. Try going back to the homepage.
          </p>
          <Link
            to="/"
            className="mb-2 me-2 inline-flex items-center rounded-lg bg-[#050708] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#050708]/90 focus:outline-none focus:ring-4 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-[#050708]/50"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
