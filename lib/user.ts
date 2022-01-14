import { withIronSessionSsr } from "iron-session/next"

export type User = {
  id: number
  email: string
  sessionToken?: string
}

export const sessionOptions = {
  password: process.env.IRON_PASSWORD || "",
  cookieName: "icc-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}

export const getUserProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  const sessionToken = query.token as string | undefined
  const user = req.session.user
  if (sessionToken && sessionToken.length > 0 && user) {
    req.session.user = {
      ...user,
      sessionToken,
    }
    await req.session.save()
  }
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: {
        user: { id: 0, email: "" } as User,
      },
    }
  }

  return {
    props: { user },
  }
},
sessionOptions)

declare module "iron-session" {
  interface IronSessionData {
    user?: User
  }
}
