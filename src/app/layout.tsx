import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OICA | Odisha Institute of Computer Applications & Certificate Verification",
  description: "Official portal for Odisha Institute of Computer Applications (OICA). Verify digital computer certificates online, access certified courses, and download high-resolution official credentials.",
  keywords: ["Computer Institute", "Certificate Verification", "OICA", "Odisha Institute of Computer Applications", "Next.js", "Supabase", "Online Certificate"],
  openGraph: {
    title: "Odisha Institute of Computer Applications (OICA)",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
