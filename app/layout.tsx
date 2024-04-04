import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/session-provider";
import {Toaster} from "react-hot-toast";

export const metadata: Metadata = {
  title: "Création d'une Application Next",
  description: "Genéré parcette création",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
<SessionProvider>
        {children}
    <Toaster />
</SessionProvider>
      </body>
    </html>
  );
}