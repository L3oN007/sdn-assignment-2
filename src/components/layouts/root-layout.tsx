import { Outlet } from "react-router-dom"

import Footer from "@/components/footer"
import Header from "@/components/header"

export default function RootLayout() {
  return (
    <div className="flex-1">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
