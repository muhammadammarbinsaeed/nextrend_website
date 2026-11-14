import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nextrend Tech Solutions | Your Vision, Our Mission",
  description: "Nextrend helps businesses move forward with high-performing websites, apps, intelligent automation, and digital growth solutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable}`}
    >
      <body>
        <noscript><style>{".reveal{opacity:1!important}"}</style></noscript>
        {children}
      </body>
    </html>
  );
}
