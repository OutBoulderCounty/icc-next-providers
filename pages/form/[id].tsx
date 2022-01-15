import { NextPage, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import React from "react"
import useSWR from "swr"
import { fetcher } from "../../utils"
import { Data } from "../api/form/[id]"
import { ElementType } from "../api/forms"
import NavBar from "../../components/navBar"
import { getUserProps } from "../../lib/user"

type InputProps = {
  type: ElementType
  options?: string[]
  elementID: string
}

const Input = ({ type, options, elementID }: InputProps) => {
  switch (type) {
    case ElementType.Text:
      return (
        <input
          type="text"
          id={elementID}
          className="flex-1 block w-full focus:ring-violet-light focus:border-violet-light min-w-0 rounded-md sm:text-sm border-gray-300"
        />
      )
    case ElementType.TextArea:
      return (
        <textarea
          id={elementID}
          className="max-w-lg shadow-sm block w-full focus:ring-violet-light focus:border-violet-light sm:text-sm border border-gray-300 rounded-md"
        />
      )
    case ElementType.Number:
      return (
        <input
          type="number"
          id={elementID}
          className="flex-1 block w-full focus:ring-violet-light focus:border-violet-light min-w-0 rounded-md sm:text-sm border-gray-300"
        />
      )
    case ElementType.RadioButtons:
      return (
        <fieldset id={elementID} className="mt-4">
          <div className="max-w-lg flex flex-col space-y-1">
            {options?.map((option) => (
              <div key={option} className="flex flex-row">
                <input
                  type="radio"
                  value={option}
                  id={option}
                  name={elementID}
                  className="focus:ring-violet-light h-4 w-4 text-violet border-gray-300"
                />
                <label
                  htmlFor={option}
                  className="ml-3 block text-sm font-medium text-gray-700 w-max"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      )
    case ElementType.Checkboxes:
      return (
        <fieldset id={elementID} className="space-y-5 mb-4">
          <div className="max-w-lg flex flex-col space-y-1">
            {options?.map((option) => (
              <div key={option} className="flex flex-row">
                <input
                  type="checkbox"
                  value={option}
                  id={option}
                  name={elementID}
                  className="focus:ring-violet-light h-4 w-4 text-violet border-gray-300 rounded"
                />
                <label
                  htmlFor={option}
                  className="ml-3 block text-sm font-medium text-gray-700 w-max"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      )
    default:
      return null
  }
}

export const getServerSideProps = getUserProps

const Form = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR<Data>(`/api/form/${id}`, fetcher)

  if (error) return <div>failed to load: {error}</div>

  return (
    <>
      <NavBar user={user} />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl font-medium text-gray-900 mx-auto w-max my-8">
            {data?.form.fields.name}
          </h1>
          {typeof data?.form.fields.header === "string" ? (
            <h2 className="text-lg font-medium my-5 max-w-2xl">
              {data?.form.fields.header}
            </h2>
          ) : null}
          <form className="space-y-8 divide-y divide-gray-200">
            {data?.form.fields.elements.map((element) => {
              return (
                <div
                  key={element.sys.id}
                  className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    htmlFor={element.sys.id}
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    {element.fields.label}
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                      <Input
                        type={element.fields.type}
                        options={element.fields.options}
                        elementID={element.sys.id}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </form>
        </div>
      </div>
    </>
  )
}

export default Form
