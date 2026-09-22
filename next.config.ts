import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,

    turbopack: {},

    sassOptions: {
        additionalData: `@use "@/styles/mixin" as *;`,
    },
};

export default nextConfig;