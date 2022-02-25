
import { createCookieSessionStorage } from "remix";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      //domain: "remix.run",
      //expires: new Date(Date.now() + 60_000),
      //httpOnly: true,
       maxAge: 7,
      //path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true
    }
  });

export { getSession, commitSession, destroySession };