"use client";
import Navigation from "@/components/navigation";
import "./globals.css";
import { PlayersProvider } from "@/contexts/players-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlayersProvider>
          <main className="flex min-h-screen flex-col items-center w-full bg-gray-900">
            <Navigation>{children}</Navigation>
          </main>
        </PlayersProvider>
      </body>
    </html>
  );
}
