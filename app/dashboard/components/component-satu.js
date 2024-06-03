import Image from "next/image"
export default function Components_satu() {
    return (
        <div>
            <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25"><div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div><div className="relative rounded-xl overflow-auto p-8"><div className="text-center rounded-lg overflow-hidden w-56 sm:w-96 mx-auto">
                <Image className="object-cover h-48 w-full " src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1024&amp;h=1280&amp;q=80" width={500} height={500}></Image>
            </div></div>
                <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5">

                </div>
            </div>

            <div class="relative rounded-xl overflow-auto p-8"><div class="flex gap-4 font-mono text-white text-sm font-bold leading-6 bg-stripes-purple rounded-lg text-center">
                    <div class="hidden p-4 w-14 h-14 bg-purple-500 shadow-lg rounded-lg">01</div>
                    <div class="p-4 w-14 h-14 bg-purple-500 shadow-lg rounded-lg">02</div>
                    <div class="p-4 w-14 h-14 bg-purple-500 shadow-lg rounded-lg">03</div>
                </div>
            </div>
        </div>
    )
}