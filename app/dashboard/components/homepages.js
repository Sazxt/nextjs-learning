import Image from "next/image"
export default function Homepages() {
    return (<>
            <div className="flex">
                {/* Sidebar */}
                <aside className="bg-gray-800 text-gray-300 w-64 min-h-screen">
                    <div className="p-4">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                        {/* Sidebar links */}
                        <ul className="mt-4">
                            <li><a href="#" className="block py-2 px-4">Dashboard</a></li>
                            <li><a href="#" className="block py-2 px-4">Users</a></li>
                            <li><a href="#" className="block py-2 px-4">Products</a></li>
                            <li><a href="#" className="block py-2 px-4">Settings</a></li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="ml-64 p-4">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                        {/* Content here */}
                        <p>Welcome to the admin dashboard!</p>
                    </div>
                </main>
            </div>
        </>)
}