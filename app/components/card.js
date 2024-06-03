import Image from "next/image";
export default function CardTest(props)
{
    return (
    <div class="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
        <div class="flex gap-4">
            <Image class="w-12 h-12 rounded-full" src="https://astrolus.netlify.app/images/avatars/avatar-2.webp" alt="user avatar" width={200} height={200} loading="lazy" />
            <div>
                <h6 class="text-lg font-medium text-gray-700 dark:text-white">Yanick Doe</h6>
                <p class="text-sm text-gray-500 dark:text-gray-300">Developer</p>
            </div>
        </div>
        <p class="mt-8 text-slate-400 font-normal">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
    </div>
    );
}