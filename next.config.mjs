/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "build",
    images: {
        unoptimized: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                // Local WordPress instance via Laragon
                protocol: "http",
                hostname: "projectname.local",
                pathname: "/**",
            },
            {
                // Staging
                protocol: "https",
                hostname: "your-staging-domain.com",
                pathname: "/**",
            },
            // Production — currently same as staging, but can be changed in the future
            // {
            //     protocol: "https",
            //     hostname: "api.skanbudynkow.pl",
            //     pathname: "/**",
            // },
        ],
    },
};

export default nextConfig;
