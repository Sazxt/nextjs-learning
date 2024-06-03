/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (
    //     config,
    //     { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    // ) => {
    //     if (config.cache && !dev) {
    //         config.cache = Object.freeze({
    //             type: 'memory',
    //         })
    //         config.cache.maxMemoryGenerations = 0
    //     }
    //     // Important: return the modified config
    //     return config
    // },
    images: {
        // Allow semua link for images
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
