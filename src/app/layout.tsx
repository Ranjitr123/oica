import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OICS | Odisha Institute of Computer Studies & Certificate Verification",
  description: "Official portal for Odisha Institute of Computer Studies (OICS). Verify digital computer certificates online, access certified courses, and download high-resolution official credentials.",
  keywords: ["Computer Institute", "Certificate Verification", "OICS", "Odisha Institute of Computer Studies", "Next.js", "Supabase", "Online Certificate"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Odisha Institute of Computer Studies (OICS)",
    description: "Instant Online Computer Certificate Verification Portal",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
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
      </head>
      <body className="antialiased selection:bg-cyan-500 selection:text-black overflow-x-hidden w-full max-w-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


