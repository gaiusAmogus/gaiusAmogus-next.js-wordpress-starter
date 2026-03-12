/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                // Allow images from your WordPress instance.
                // Replace with your actual WordPress domain.
                protocol: "http",
                hostname: "localhost",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "**.your-wp-domain.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
