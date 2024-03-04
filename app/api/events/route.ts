import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const reqData = await req.json();

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("baba-bet");

    const collection = database.collection("events");
    await collection.insertOne({
      ...reqData,
    });

    return Response.json(
      { message: "Event created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("baba-bet");

    const collection = database.collection("events");
    const eventsData = await collection.find().toArray();

    return Response.json({ data: eventsData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
