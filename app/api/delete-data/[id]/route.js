import { connectToDatabase } from "@/app/utils/dbConnect";
import { ObjectId } from 'mongodb';
export async function DELETE(request, { params }) {
    const id = params.id
    console.log(id);
    const client = await connectToDatabase();
    try {
        const db = client.db('test-data');
        const collection = db.collection('test');
         // Hapus data berdasarkan ID
        await collection.deleteOne({ _id: new ObjectId(id) });

        // Tutup koneksi MongoDB
        // await client.close();
        return Response.json({ message: 'Data Berhasil Di Hapus' });
    } catch (error) {
        console.error('Gagal melakukan update:', error);
        return Response.json({ message: 'Terjadi kesalahan saat melakukan update' });
    } finally {
        // await client.close();
    }
}