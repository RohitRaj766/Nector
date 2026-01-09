import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const gilroyLight = localFont({
  src: "../public/fonts/Gilroy/Gilroy-Light.otf",
  variable: "--font-gilroy-light",
  weight: "300",
  display: "swap",
});

const gilroyExtraBold = localFont({
  src: "../public/fonts/Gilroy/Gilroy-ExtraBold.otf",
  variable: "--font-gilroy-extrabold",
  weight: "800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nectar - Online Grocery",
  description: "Get your groceries in as fast as one hour",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gilroyLight.variable} ${gilroyExtraBold.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
