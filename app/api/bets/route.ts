import { getIronSession } from "iron-session";
import { MongoClient, ObjectId } from "mongodb";
import { cookies } from "next/headers";

import { SessionData } from "@/app/_types/sessionData";
import { sessionOptions } from "@/app/_auth/sessionOptions";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const reqData = await req.json();

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("baba-bet");

    const collection = database.collection("bets");
    await collection.insertOne({
      ...reqData,
      userID: new ObjectId(session.id),
    });

    return Response.json(
      { message: "Data saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

//export async function GET(req: Request) {
//  const betID = new URL(req.url).searchParams.get("id");
//  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

//  if (betID) {
//    const client = new MongoClient(process.env.MONGODB_URI);

//    try {
//      await client.connect();
//      const database = client.db("baba-bet");

//      const collection = database.collection("bets");
//      const betData = await collection
//        .find({ _id: new ObjectId(betID), userID: new ObjectId(session.id) })
//        .toArray();

//      return Response.json({ data: betData }, { status: 200 });
//    } catch (error) {
//      return Response.json(
//        { message: "Something went wrong!" },
//        { status: 500 }
//      );
//    }
//  } else {
//    return Response.json({ message: "Missing bet id" }, { status: 400 });
//  }
//}
