// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Entry } from "contentful"
import { newContentfulClient } from "../../utils"

export type Data = {
  forms: Entry<Form>[]
}

export type Form = {
  name: string
  required: boolean
  elements: Entry<Element>[]
}

type Element = {
  label: string
  type: ElementType
  required: boolean
}

export enum ElementType {
  Text = "Text",
  TextArea = "Text Area",
  Number = "Number",
  RadioButtons = "Radio Buttons",
  Checkboxes = "Checkboxes",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = newContentfulClient()
  const forms = await client.getEntries<Form>({ content_type: "form" })
  res.status(200).json({ forms: forms.items })
}
