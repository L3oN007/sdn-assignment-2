import { Route, Routes } from "react-router-dom"

import AddWatchPage from "@/pages/admin/add-watch"
import AdminWatchesPage from "@/pages/admin/watches"
import ErrorPage from "@/pages/error"
import HomePage from "@/pages/home"
import LoginPage from "@/pages/login"
import RegisterPage from "@/pages/register"
import UnauthorizedPage from "@/pages/unauthorized"
import WatchDetailPage from "@/pages/watch-detail"

import AdminLayout from "@/components/layouts/admin-layout"
import RootLayout from "@/components/layouts/root-layout"

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* !WATCH ROUTE */}
        <Route path="/watch/:id" element={<WatchDetailPage />} />

        <Route path="/401" element={<UnauthorizedPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin/watches" element={<AdminWatchesPage />} />
        <Route path="/admin/watch/add" element={<AddWatchPage />} />
      </Route>
    </Routes>
  )
}

export default App
