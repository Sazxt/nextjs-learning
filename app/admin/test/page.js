import Sidebar from '@/app/components/sidebar';
import Link from 'next/link';
import Testadmin from "../dashboard/components/test";

export default function Home() {

	return (
		<div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <Sidebar/>
                {/* Main Content */}
                <div className="flex-1">
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                            <h1 className="text-3xl font-bold leading-tight text-gray-900">

                            </h1>
                        </div>
                    </header>

                    <main>
                        <Testadmin/>
                    </main>
                </div>
            </div>
        </div>
	);
}
