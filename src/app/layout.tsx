import { AuthContextProvider } from "@/firebase/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import { Providers } from "./providers";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flyoversticker",
  description: "Invoice & report generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthContextProvider>
            <Layout>{children}</Layout>
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
