import { Skeleton } from 'antd';
export default function Testadmin() {
    return (
        <div class="mx-auto py-6 sm:px-6 lg:px-8">
            <div class="w-full py-6">
                <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                        <Skeleton />
                    </div>
                </div>
            </div>
        </div>
    );
}