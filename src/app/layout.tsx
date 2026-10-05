import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Boundless Souls Tours - Where Every Journey Touches the Soul",
  description:
    "At Boundless Souls Tours, we create memorable travel and lifestyle experiences in Rwanda. Gorilla trekking in Musanze & Kinigi, Akagera wilderness safaris, Bigogwe countryside, Lake Kivu, Kigali city tours, apartment bookings, private chefs, and private drivers.",
  keywords: [
    "Boundless Souls Tours",
    "Rwanda Gorillas",
    "Musanze Kinigi Gorilla Trekking",
    "Akagera Safari",
    "Bigogwe Cattle Culture",
    "Lake Kivu",
    "Kigali City Tours",
    "Rwanda Apartment Booking",
    "Rwanda Private Chef",
    "Rwanda Private Driver",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={jost.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
