import type { NextConfig } from "next";
import factory from "./factory.json";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

// Until factory.json says the site is launched, every response tells search engines to stay away.
const prelaunchHeaders = factory.launched
  ? []
  : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders, ...prelaunchHeaders],
      },
    ];
  },
};

export default nextConfig;
