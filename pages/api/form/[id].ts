import type { NextApiRequest, NextApiResponse } from "next"
import { Entry, createClient } from "contentful"
import { Form } from "../forms"
import { newContentfulClient } from "../../../utils"

export type Data = {
  form: Entry<Form>
}

type Error = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const client = newContentfulClient()
  if (typeof req.query.id !== "string") {
    res.status(400).json({ error: "Invalid form id" })
    return
  }
  const form = await client.getEntry<Form>(req.query.id)
  res.status(200).json({ form })
}
