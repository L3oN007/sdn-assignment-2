import { Outlet } from "react-router-dom"

import { useAuthContext } from "@/contexts/auth-provider"

import UnauthorizedPage from "@/pages/unauthorized"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { Loader } from "@/components/loader"

export default function AdminLayout() {
  const { isAuthenticated, member, loading } = useAuthContext()

  if (loading) {
    //@ts-expect-error type error
    return <Loader loading={loading} />
  }

  if (!isAuthenticated || !member?.isAdmin) {
    return <UnauthorizedPage />
  }

  return (
    <div className="flex-1">
      <Header />
      <main className="my-16 bg-white mx-10 min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
