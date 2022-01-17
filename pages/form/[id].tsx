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
          name={elementID}
          id={elementID}
          className="flex-1 block w-full focus:ring-violet-light focus:border-violet-light min-w-0 rounded-md sm:text-sm border-gray-300"
        />
      )
    case ElementType.TextArea:
      return (
        <textarea
          name={elementID}
          id={elementID}
          className="max-w-lg shadow-sm block w-full focus:ring-violet-light focus:border-violet-light sm:text-sm border border-gray-300 rounded-md"
        />
      )
    case ElementType.Number:
      return (
        <input
          type="number"
          name={elementID}
          id={elementID}
          className="flex-1 block w-full focus:ring-violet-light focus:border-violet-light min-w-0 rounded-md sm:text-sm border-gray-300"
        />
      )
    case ElementType.RadioButtons:
      return (
        <fieldset name={elementID} id={elementID} className="mt-4">
          <div className="max-w-lg flex flex-col space-y-1">
            {options?.map((option) => (
              <div key={option} className="flex flex-row">
                <label className="ml-3 block text-sm font-medium text-gray-700 w-max">
                  <input
                    type="radio"
                    value={option}
                    name={elementID}
                    className="focus:ring-violet-light h-4 w-4 text-violet border-gray-300"
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      )
    case ElementType.Checkboxes:
      return (
        <fieldset name={elementID} id={elementID} className="space-y-5 mb-4">
          <div className="max-w-lg flex flex-col space-y-1">
            {options?.map((option) => (
              <div key={option} className="flex flex-row">
                <label className="ml-3 block text-sm font-medium text-gray-700 w-max">
                  <input
                    type="checkbox"
                    value={option}
                    name={`${elementID}[]`}
                    className="focus:ring-violet-light h-4 w-4 text-violet border-gray-300 rounded"
                  />
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

  const handleCancelClick = () => router.push("/")

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const formData = e.currentTarget
  //   for (let i = 0; i < formData.length; i++) {
  //     const input = formData[i] as HTMLInputElement
  //     if (input.value) {
  //       const response = {}
  //       if (["radio", "checkbox"].includes(input.type)) {
  //         if (input.checked) {
  //           console.log({
  //             name: input.name,
  //             type: input.type,
  //             value: input.value,
  //           })
  //         }
  //       } else {
  //         console.log({
  //           name: input.name,
  //           type: input.type,
  //           value: input.value,
  //         })
  //       }
  //     }
  //   }
  // }

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
          <form
            className="space-y-8 divide-y divide-gray-200"
            data-netlify={true}
          >
            {data?.form.fields.elements.map((element) => {
              return (
                <div
                  key={element.sys.id}
                  className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    htmlFor={element.sys.id}
                    className="block text-sm font-medium text-gray-700 mt-4 sm:mt-0 sm:pt-2"
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
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-light"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet hover:bg-violet-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-light"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Form
