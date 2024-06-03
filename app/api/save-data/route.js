import { connectToDatabase } from "@/app/utils/dbConnect";
export async function POST(request) {
    // await new Promise((resolve) => setTimeout(resolve, 9000));
    const client = await connectToDatabase();
    const db = client.db('test-data');
    const collection = db.collection('test');
    const requestBody = await request.json();
    const newDocument = {
        username : requestBody.username,
        email: requestBody.email,
    };
    const result = await collection.insertOne(newDocument);
    return Response.json({
        status : true,
        message : "Message Success"
    });
}