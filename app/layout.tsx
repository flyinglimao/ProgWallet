import type { Metadata } from "next";
import { Londrina_Solid } from "next/font/google";
import "./globals.css";
import { Nav } from "./_components/Nav";

const londrinaSolid = Londrina_Solid({ subsets: ["latin"], weight: ["300"] });

export const metadata: Metadata = {
  title: "FrogWallet",
  description: "Metamorphosable Programmable Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={londrinaSolid.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
