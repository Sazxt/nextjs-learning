import { connectToDatabase } from "@/app/utils/dbConnect";
import { ObjectId } from 'mongodb';
export async function POST(request) {
    const client = await connectToDatabase();
    try {
        const db = client.db('test-data');
        const collection = db.collection('test');
        const requestBody = await request.json();
        console.log(requestBody)
        const result = await collection.updateOne(
            { _id: new ObjectId(requestBody.id) },
            { $set: { username: requestBody.name, email: requestBody.email } }
        );
        if (result.modifiedCount === 1) {
            return Response.json({ message: 'Dokumen berhasil diupdate' });
        } else {
            return Response.json({ message: 'Dokumen tidak ditemukan' });
        }
    } catch (error) {
        console.error('Gagal melakukan update:', error);
        return Response.json({ message: 'Terjadi kesalahan saat melakukan update' });
    } finally {
        // await client.close();
    }
}