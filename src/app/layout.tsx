import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OICS | Odisha Institute of Computer Studies & Certificate Verification",
  description: "Official portal for Odisha Institute of Computer Studies (OICS). Verify digital computer certificates online, access certified courses, and download high-resolution official credentials.",
  keywords: ["Computer Institute", "Certificate Verification", "OICS", "Odisha Institute of Computer Studies", "Next.js", "Supabase", "Online Certificate"],
  openGraph: {
    title: "Odisha Institute of Computer Studies (OICS)",
    description: "Instant Online Computer Certificate Verification Portal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-cyan-500 selection:text-black overflow-x-hidden w-full max-w-full">
        {children}
      </body>
    </html>
  );
}

