import type { InferGetServerSidePropsType, NextPage } from "next"
import useSWR from "swr"
import React from "react"
import { Data } from "./api/forms/tally"
import { fetcher } from "../utils"
import { getUserProps } from "../lib/user"
import NavBar from "../components/navBar"

export const getServerSideProps = getUserProps

type ActiveProps = {
  isActive: boolean
  className?: string
  children: React.ReactNode
}

const Active = ({ isActive, className, children }: ActiveProps) => {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${className} ${
        isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {children}
    </span>
  )
}

const Home = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, error } = useSWR<Data, Error>("/api/forms/tally", fetcher)

  if (error) return <div>failed to load: {error.message}</div>

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main>
        <header>
          <NavBar user={user} />
        </header>
        <div>
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="mt-1 text-gray-900 sm:tracking-tight">
                  All of the required and supplemental forms can be found below.
                  Your responses will be located verbatim on your profile for
                  users to look over and determine a provider that is right for
                  them. Be sure to update your responses on occasion and note
                  what forms have been approved or flagged by our admins. If you
                  have any questions or concerns please reach out to{" "}
                  <a
                    className="text-violet hover:text-violet-dark"
                    href="mailto:icc@outboulder.org"
                  >
                    icc@outboulder.org
                  </a>{" "}
                  and our coordinator will address these with you.
                </p>
                <p className="max-w-xl mt-5 mx-auto text-gray-500">
                  Thank you for being a part of this revolutionary resource for
                  the LGBTQ+ community.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="my-3 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div>
                  <table className="divide-y divide-gray-200 max-w-xl mx-auto border border-gray-200 h-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Form Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Required
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Options
                        </th>
                      </tr>
                    </thead>
                    <tbody className="overflow-y-scroll">
                      {data?.forms
                        ?.sort((a, b) => {
                          if (a.required < b.required) return 1
                          if (a.required > b.required) return -1
                          return 0
                        })
                        .map((form, formIdx) => (
                          <tr
                            key={form.id}
                            className={
                              formIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {form.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Active isActive={form.required}>
                                {form.required ? "Yes" : "No"}
                              </Active>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="text-violet hover:text-violet-darkest">
                                <a
                                  href={`${form.url}?user_id=${user.id}&form_id=${form.id}`}
                                  target="_blank"
                                >
                                  Create
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
