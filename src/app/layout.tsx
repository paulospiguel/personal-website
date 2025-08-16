import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "../styles/globals.scss";

export const metadata = {
  title: "Paulo Spiguel - Portfolio",
  description: "Paulo Spiguel's Portfolio",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
