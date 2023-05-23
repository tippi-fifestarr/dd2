// "use client";
import "../styles/globals.css";
import Image from "next/image";
import Head from "./head";
import { Gorditas, Oswald, Frijole, Island_Moments } from "next/font/google";

export const gorditas = Gorditas({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gorditas",
});

export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-oswald",
});

export const frijole = Frijole({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-frijole",
});

export const islandMoments = Island_Moments({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-island-moments",
  color: "text-slate-100",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body className="bg-slate-900">
        {children /* render the children  */}
      </body>
    </html>
  );
}
