import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.AUTH_SECRET,
  cookieName: "auth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
