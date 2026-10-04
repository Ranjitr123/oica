import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oics-institute.edu";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/upload", "/api/certificates?admin=true"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
