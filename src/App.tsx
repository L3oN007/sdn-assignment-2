import { Route, Routes } from "react-router-dom"

import AdminAccountPage from "@/pages/admin/accounts"
import AddBrandPage from "@/pages/admin/add-brand"
import AddWatchPage from "@/pages/admin/add-watch"
import AdminBrandsPage from "@/pages/admin/brands"
import EditBrandPage from "@/pages/admin/edit-brand"
import EditWatchPage from "@/pages/admin/edit-watch"
import AdminWatchesPage from "@/pages/admin/watches"
import ErrorPage from "@/pages/error"
import HomePage from "@/pages/home"
import LoginPage from "@/pages/login"
import RegisterPage from "@/pages/register"
import SearchPage from "@/pages/search"
import SettingsPage from "@/pages/settings"
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
        <Route path="/search" element={<SearchPage />} />

        <Route path="/401" element={<UnauthorizedPage />} />
        <Route path="*" element={<ErrorPage />} />
        {/* ! SETTINGS ROUTE */}
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        {/* ! WATCH ROUTE */}
        <Route path="/admin/watches" element={<AdminWatchesPage />} />
        <Route path="/admin/watch/add" element={<AddWatchPage />} />
        <Route path="/admin/watch/:id" element={<EditWatchPage />} />

        {/* ! ACCOUNT ROUTE */}
        <Route path="/admin/accounts" element={<AdminAccountPage />} />

        {/* ! BRAND ROUTE */}
        <Route path="/admin/brands" element={<AdminBrandsPage />} />
        <Route path="/admin/brand/add" element={<AddBrandPage />} />
        <Route path="/admin/brand/:id" element={<EditBrandPage />} />
      </Route>
    </Routes>
  )
}

export default App
