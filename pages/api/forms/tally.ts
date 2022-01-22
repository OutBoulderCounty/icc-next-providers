import type { NextApiRequest, NextApiResponse } from "next"

export type Data = {
  forms: Form[]
}

type Form = {
  id: number
  name: string
  url: string
  required: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const resp = await fetch(`${process.env.API_URL}/forms/tally`, {
    method: "GET",
  })
  res.status(resp.status).json(await resp.json())
}
