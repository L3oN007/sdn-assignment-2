import ErrorPage from "@/pages/error"
import HomePage from "@/pages/home"
import LoginPage from "@/pages/login"
import RegisterPage from "@/pages/register"
import WatchDetailPage from "@/pages/watch-detail"
import { Route, Routes } from "react-router-dom"

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

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default App
