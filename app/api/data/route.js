import { connectToDatabase } from "@/app/utils/dbConnect";

export async function POST(request) {
    // await new Promise((resolve) => setTimeout(resolve, 9000));
    const client = await connectToDatabase();
    const db = client.db('test-data');
    const collection = db.collection('test');
    const data_mongo = await collection.find({}).toArray();
    const requestBody = await request.json();
    const startRow = requestBody.startRow;
    const endRow = requestBody.endRow;
    const pageSize = requestBody.pageSize;
    const currentPage = requestBody.currentPage;

    // Simulasikan data dari database
    const data = data_mongo.map((item, index) => ({
        id: item._id.toString(),
        name: item.username,
        email: item.email,
    }));

    // Hitung total halaman
    const totalPages = Math.ceil(data.length / pageSize);

    // Ambil data untuk halaman saat ini
    const rowsThisPage = data.slice(startRow, endRow);

    // Tentukan lastRow
    const lastRow = currentPage === totalPages ? data.length : -1;

    return Response.json({
        rows: rowsThisPage,
        lastRow: lastRow
    });
}