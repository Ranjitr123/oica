import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oics-institute.edu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OICS | Odisha Institute of Computer Studies & Certificate Verification",
    template: "%s | Odisha Institute of Computer Studies"
  },
  description: "Official portal for Odisha Institute of Computer Studies (OICS), managed by Sanjit Kumar Rautaray. Verify digital computer certificates online, access PGDCA, DCA & Software Engineering courses, and download official credentials.",
  keywords: [
    "OICS",
    "Odisha Institute of Computer Studies",
    "Computer Institute Nirakarpur",
    "Computer Certificate Verification",
    "PGDCA Course Odisha",
    "DCA Diploma Khordha",
    "Sanjit Kumar Rautaray",
    "ISO 9001:2026 Computer Training",
    "Online Certificate Verification Portal",
    "Computer Education Odisha"
  ],
  authors: [{ name: "Sanjit Kumar Rautaray", url: siteUrl }],
  creator: "Odisha Institute of Computer Studies (OICS)",
  publisher: "Odisha Institute of Computer Studies (OICS)",
  category: "Education / Computer Studies",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Odisha Institute of Computer Studies (OICS) | Certificate Portal",
    description: "Official Portal for Odisha Institute of Computer Studies. Verify digital credentials instantly, explore PGDCA & DCA courses, and access verified student records.",
    url: siteUrl,
    siteName: "Odisha Institute of Computer Studies (OICS)",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Odisha Institute of Computer Studies (OICS)",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odisha Institute of Computer Studies (OICS)",
    description: "Verify digital computer certificates online & access PGDCA, DCA credentials.",
    images: ["/icon.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: "#06b6d4",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Odisha Institute of Computer Studies",
  "alternateName": "OICS Institute",
  "url": siteUrl,
  "logo": `${siteUrl}/icon.svg`,
  "description": "Official Computer Education Institute & Digital Certificate Verification Portal managed by Sanjit Kumar Rautaray in Nirakarpur, Khordha, Odisha.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "At- Nanapada, PO/PS- Nirakarpur",
    "addressLocality": "Khordha",
    "addressRegion": "Odisha",
    "postalCode": "752019",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9777735527",
    "email": "sanjit007muna@gmail.com",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Odia", "Hindi"]
  },
  "founder": {
    "@type": "Person",
    "name": "Sanjit Kumar Rautaray"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Computer Programs & Diplomas",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "PGDCA (Post Graduate Diploma in Computer Applications)",
          "description": "1 Year Advanced Computer Application Program covering software, databases, office automation, and programming."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "DCA (Diploma in Computer Applications)",
          "description": "6 Months Fundamental Computer Diploma covering office suite, internet applications, and basic programming."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Full-Stack Web Development & Cloud Architecture",
          "description": "6 Months Intensive program in HTML, CSS, JavaScript, React, Node.js, and Cloud Deployment."
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-cyan-500 selection:text-black overflow-x-hidden w-full max-w-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


