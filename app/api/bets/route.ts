import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: Request, res: Response) {
  const reqData = await req.json();

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("baba-bet"); // Choose a name for your database

    const collection = database.collection("bets"); // Choose a name for your collection
    await collection.insertOne({ ...reqData });

    return Response.json(
      { message: "Data saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
