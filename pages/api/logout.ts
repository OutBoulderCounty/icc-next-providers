import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "../../lib/user"

export default withIronSessionApiRoute(async (req, res) => {
  req.session.destroy()
  res.status(200).redirect("/login")
}, sessionOptions)
