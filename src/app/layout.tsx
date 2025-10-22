import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton, Manrope } from "next/font/google";
import "./globals.css";
import "./styles.css";
import LayoutWrapper from "./LayoutWrapper"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});
const manrope = Manrope({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Les Petits Plats",
  description: "Recettes simples et délicieuses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${manrope.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
