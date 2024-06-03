const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

let cachedClient = null;

export async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient;
    }

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        cachedClient = client;
        return client;
    } catch (error) {
        console.error('Gagal terhubung ke MongoDB:', error);
        throw error;
    }
}

export async function disconnectFromDatabase() {
    if (cachedClient) {
        await cachedClient.close();
        cachedClient = null;
    }
}