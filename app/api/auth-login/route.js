import { connectToDatabase } from "@/app/utils/dbConnect";
import bcrypt from 'bcryptjs';
export async function POST(request) {
    const client = await connectToDatabase();
    try {
        const db = client.db('test-data');
        const requestBody = await request.json();
        console.log(requestBody)

        // const password = requestBody.password;
        // const saltRounds = 10;

        // bcrypt.hash(password, saltRounds, (err, hash) => {
        // if (err) {
        //     console.error('Error hashing password:', err);
        //     return;
        // }
        // console.log('Hashed password:', hash);
        // // Simpan hash password ke database atau gunakan sesuai kebutuhan
        // });

        const user = await db.collection('users').findOne({ "email" :  requestBody.email});

        if (!user) {
            return Response.json({ status : 400, message: 'Invalid username' });
        }
        const passwordMatch = await bcrypt.compare(requestBody.password, user.password);
        if (!passwordMatch) {
            return Response.json({ status : 400, message: 'Invalid password' });
        }

        // request.session.user = {
        //     id: user._id,
        //     username: user.username,
        // };
        // await request.session.save();
        return Response.json({ status : 200, message: 'Login successful' });
    } catch (error) {
        console.error('Gagal melakukan update:', error);
        return Response.json({ status : 400, message: 'Terjadi kesalahan saat login' });
    }
}