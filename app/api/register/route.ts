import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic";

export async function POST(req: Request, res: Response) {
  const reqData = await req.json();
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("baba-bet");

    const collection = database.collection("users");
    const userExists = await collection.find({ user: reqData.user }).toArray();
    const emailExists = await collection
      .find({ email: reqData.email })
      .toArray();

    const errorMessages = [];

    if (userExists.length > 0) {
      errorMessages.push({ message: "Usuário já cadastrado", field: "user" });
    }

    if (emailExists.length > 0) {
      errorMessages.push({ message: "E-mail já cadastrado", field: "email" });
    }

    if (errorMessages.length > 0) {
      return Response.json(errorMessages, { status: 400 });
    } else {
      await collection.insertOne({ ...reqData, points: 1000 });

      return Response.json(
        { message: "Data saved successfully!" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
