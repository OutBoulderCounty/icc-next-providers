import React from "react"
import { Disclosure } from "@headlessui/react"
import {
  HomeIcon,
  MenuIcon,
  ClipboardIcon,
  LoginIcon,
  XIcon,
} from "@heroicons/react/outline"
import Link from "next/link"
import { User } from "../lib/user"
import router from "next/router"

type Props = {
  user?: User
}

const NavBar = ({ user }: Props) => {
  const [error, setError] = React.useState<Error | null>(null)
  const logout = (e: React.SyntheticEvent) => {
    e.preventDefault()
    fetch("/api/logout", {
      method: "POST",
    })
      .then(() => {
        router.push("/login")
      })
      .catch((err) => {
        setError(err)
      })
  }
  return (
    <Disclosure as="nav" className="bg-white shadow max-h-max">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-light">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {/* TODO: update link with url for icc-ui page */}
                  <a href="https://develop.inclusivecareco.org">
                    <img
                      className="hidden md:block h-8 w-auto"
                      src="/color-horizontal1x.png"
                      alt="Home Icon"
                    />
                  </a>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* TODO: put navigation items here */}
                </div>
              </div>
              {error ? (
                <p className="text-red-600">Error: {error.message}</p>
              ) : null}
              {user && (
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <button
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 w-36 focus:ring-violet text-white bg-violet hover:bg-violet-dark"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Disclosure.Panel className="md:hidden border-t-2">
            <div className="pt-2 pb-3 space-y-1">
              {/* TODO: put navigation items here */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar
