import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8080/api/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [new URL('https://static1.mujerhoy.com/**'), 
      new URL('https://imagessl.casadellibro.com/**'),
      new URL("https://trabalibros.com/**"),
      new URL("https://upload.wikimedia.org/**"),
      new URL("https://images-na.ssl-images-amazon.com/**"),
      new URL("https://images.gr-assets.com/**")],
  },


  };

export default nextConfig;
