import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description: "A simple weather app built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Weather App</title>
        <meta name="description" content="A simple weather app built with Next.js and Tailwind CSS" />
        <meta property="og:title" content="Weather App" />
        <meta property="og:description" content="A simple weather app built with Next.js and Tailwind CSS" />
        <meta property="og:image" content="/preview.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
