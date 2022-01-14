import { createClient } from "contentful"

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const newContentfulClient = () =>
  createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  })
