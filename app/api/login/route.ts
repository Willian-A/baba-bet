import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";

import { sessionOptions } from "@/app/_auth/sessionOptions";
import { SessionData } from "@/app/_types/sessionData";

export const dynamic = "force-dynamic"; // defaults to auto

const defaultSession: SessionData = {
  id: "",
  username: "",
  email: "",
  isLoggedIn: false,
};

// login
export async function POST(request: NextRequest) {
  const reqData = await request.json();

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );
    await client.connect();
    const database = client.db("baba-bet");

    const collection = database.collection("users");
    const userData = await collection
      .find({ email: reqData.email, password: reqData.password })
      .toArray();

    if (userData.length === 0) {
      return Response.json(
        [{ message: "E-mail ou senha estão errados", field: "password" }],
        { status: 400 }
      );
    }

    session.isLoggedIn = true;
    session.username = userData[0].user;
    session.email = userData[0].email;
    session.id = userData[0]._id.toString();
    await session.save();

    return Response.redirect(`${request.nextUrl.origin}/home`, 303);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

// logout
export async function GET(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const action = new URL(request.url).searchParams.get("action");
  if (action === "logout") {
    session.destroy();
    return redirect("/login");
  }

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}
