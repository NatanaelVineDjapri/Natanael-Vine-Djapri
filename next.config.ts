import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Lets next/image serve images the dashboard uploads to Supabase
    // Storage (see supabase/storage.sql), on top of the ones already
    // shipped under /public.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
