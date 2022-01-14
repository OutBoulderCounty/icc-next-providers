import React from "react"
import Loader from "../components/loader"
import Err from "next/error"
import { LockClosedIcon } from "@heroicons/react/solid"
import Modal from "../components/modal"
import { CheckIcon } from "@heroicons/react/outline"
import { Dialog } from "@headlessui/react"

const Login = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [error, setError] = React.useState<Error | null>(null)

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
    }
    setLoading(true)
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: target.email.value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setModalOpen(true)
        } else {
          const err = new Error("Something went wrong")
          setError(err)
        }
        setLoading(false)
      })
      .catch((err: Error) => setError(err))
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <Err statusCode={500}>
        <p>{`${error.name}: ${error.message}`}</p>
      </Err>
    )
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="logo.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
              Create or sign into your provider account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet focus:border-violet focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group disabled:opacity-50 disabled:cursor-not-allowed disabled:outline-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet hover:bg-violet-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet"
                disabled={loading}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-violet-darkest group-hover:text-violet-lightest"
                    aria-hidden="true"
                  />
                </span>
                Submit
              </button>
            </div>
          </form>
          <Modal setOpen={setModalOpen} open={modalOpen}>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    "No Passwords Required!"
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please check your email for a magic link that will log you
                      into the provider dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default Login
