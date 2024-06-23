import { useAuthContext } from "@/contexts/auth-provider"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export default function Header() {
  const { isAuthenticated, member, logout } = useAuthContext()

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
            {member?.isAdmin && (
              <>
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
              </>
            )}
          </nav>
        </div>
        <div className="space-x-2">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full"
                  src="/ava.png"
                  alt="ava"
                />
                <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white  rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium text-black">
                  {member?.memberName}
                </p>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="text-sm font-medium text-neutral-500 transition-colors hover:text-black hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  )
}
