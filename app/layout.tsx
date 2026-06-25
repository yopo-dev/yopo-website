import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yopo — Smart Buildings, Smarter Energy",
  description:
    "Yopo is a Dubai-based technology platform combining AI-driven energy intelligence and building access control for residential and commercial properties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
