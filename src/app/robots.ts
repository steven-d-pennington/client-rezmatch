import type { MetadataRoute } from "next";
import { launched } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: launched
      ? { userAgent: "*", allow: "/", disallow: ["/review", "/directions/"] }
      : { userAgent: "*", disallow: "/" },
  };
}
