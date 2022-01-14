import { NextPage } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"
import { fetcher } from "../../utils"
import { Data } from "../api/form/[id]"
import { ElementType } from "../api/forms"

type InputProps = {
  type: ElementType
}

const Input = ({ type }: InputProps) => {
  switch (type) {
    case ElementType.Text:
      return <input type="text" />
    case ElementType.TextArea:
      return <textarea />
    case ElementType.Number:
      return <input type="number" />
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
      <form>
        {data?.form.fields.elements.map((element) => {
          return (
            <div key={element.sys.id}>
              <label>{element.fields.label}</label>
              <Input type={element.fields.type} />
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default Form
