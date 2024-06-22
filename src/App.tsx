import ErrorPage from "@/pages/error"
import HomePage from "@/pages/home"
import LoginPage from "@/pages/login"
import { Route, Routes } from "react-router-dom"

import RootLayout from "@/components/layouts/root-layout"

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default App
