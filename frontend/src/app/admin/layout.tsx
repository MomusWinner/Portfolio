import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "../globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${robotoMono.variable} antialiased bg-background`}>
        <div className="font-mono grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 sm:p-20 md:p-40 lg:p-70 pb-20 gap-16 ">
          <main className="flex flex-col gap-[32px] row-start-2 itmes-stretch w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
