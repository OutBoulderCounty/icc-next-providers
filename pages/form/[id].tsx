import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import useSWR from "swr"
import { fetcher } from "../../utils"
import { Data } from "../api/form/[id]"
import { ElementType } from "../api/forms"

type InputProps = {
  type: ElementType
  options?: string[]
  elementID?: string
}

const Input = ({ type, options, elementID }: InputProps) => {
  switch (type) {
    case ElementType.Text:
      return <input type="text" />
    case ElementType.TextArea:
      return <textarea />
    case ElementType.Number:
      return <input type="number" />
    case ElementType.RadioButtons:
      return (
        <fieldset>
          {options?.map((option) => (
            <React.Fragment key={option}>
              <input type="radio" value={option} id={option} name={elementID} />
              <label htmlFor={option}>{option}</label>
            </React.Fragment>
          ))}
        </fieldset>
      )
    case ElementType.Checkboxes:
      return (
        <fieldset>
          {options?.map((option) => (
            <React.Fragment key={option}>
              <input
                type="checkbox"
                value={option}
                id={option}
                name={elementID}
              />
              <label htmlFor={option}>{option}</label>
            </React.Fragment>
          ))}
        </fieldset>
      )
    default:
      return null
  }
}

const Form: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR<Data>(`/api/form/${id}`, fetcher)

  if (error) return <div>failed to load: {error}</div>

  return (
    <div>
      <h1>{data?.form.fields.name}</h1>
      {typeof data?.form.fields.header === "string" ? (
        <h2>{data?.form.fields.header}</h2>
      ) : null}
      <form>
        {data?.form.fields.elements.map((element) => {
          return (
            <div key={element.sys.id}>
              <label>{element.fields.label}</label>
              <Input
                type={element.fields.type}
                options={element.fields.options}
                elementID={element.sys.id}
              />
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default Form
