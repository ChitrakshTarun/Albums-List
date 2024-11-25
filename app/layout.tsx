import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Fevenir's Albums List",
  description: "I take my music very seriously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
