import { withIronSessionApiRoute } from "iron-session/next"
import { User, sessionOptions } from "../../lib/user"

export default withIronSessionApiRoute(async (req, res) => {
  const { email } = JSON.parse(req.body) as { email: string }
  const resp = await fetch(`${process.env.API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      redirect_url: process.env.REDIRECT_URL,
    }),
  })
  if (resp.status === 200) {
    const data: User = await resp.json()
    req.session.user = {
      id: data.id,
      email: data.email,
    }
    await req.session.save()
    res.status(200).json(data)
    return
  }
  res.status(resp.status).json(await resp.json())
}, sessionOptions)
