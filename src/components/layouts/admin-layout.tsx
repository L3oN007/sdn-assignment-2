import { useAuthContext } from "@/contexts/auth-provider"
import { Outlet } from "react-router-dom"

import UnauthorizedPage from "@/pages/unauthorized"

import Footer from "@/components/footer"
import Header from "@/components/header"

export default function AdminLayout() {
  const { isAuthenticated, member } = useAuthContext()

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
