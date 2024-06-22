import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="p-4 text-3xl font-bold">Rolet</h1>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            <Link
              to={"/"}
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-black"
            >
              Home
            </Link>

            <Link
              to="/settings"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-black"
            >
              Settings
            </Link>

            <Link
              to="/admin/watches"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-black"
            >
              Manage Watches
            </Link>
            <Link
              to="/admin/brands"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-black"
            >
              Manage Brands
            </Link>
            <Link
              to="/admin/accounts"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-black"
            >
              Manage Accounts
            </Link>
          </nav>
        </div>
        <div className="space-x-2">
          <Link to="/auth/login">
            <Button size="sm" type="button" variant={"ghost"}>
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button size="sm" type="button">
              Become a member
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
