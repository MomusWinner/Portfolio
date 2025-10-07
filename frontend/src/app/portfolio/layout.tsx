import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "../globals.css";
import PhaserGame from "@/components/GameOfLifeWrapper";
// import Head from "next/head";
//


const robotoMono = Roboto_Mono({
	variable: "--font-roboto-mono",
	subsets: ["cyrillic"],
});

export const metadata: Metadata = {
	title: "Krdyan Areg",
	description: "Porfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body
				className={`${robotoMono.variable} antialiased bg-background-dark`}
			>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 -z-11">
					<PhaserGame />
				</div>
				<main className="relative max-w-5xl mx-auto p-6 md:p-12 space-y-12">
					<div className="h-60"></div>
					<div className="p-15 rounded-2xl shadow-xl/30 bg-background inset-0 -z-10">
						{children}
					</div>
				</main>
			</body>
		</html >
	);
}

// <div className="font-mono grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 sm:p-20 md:p-40 lg:p-70 pb-20 gap-16 ">
// 	<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//
// {/* Top background / cover */}
// <div className="relative w-full h-[60vh] overflow-hidden">
// 	<img
// 		src="/cover.jpg"
// 		alt="Game cover"
// 		className="absolute inset-0 w-full h-full object-cover"
// 	/>
// 	<div className="absolute inset-0 bg-black/50" /> {/* dark overlay */}
//
// 	{/* Title + metadata */}
// 	<div className="absolute bottom-0 left-0 p-6 md:p-12">
// 		<h1 className="text-4xl md:text-5xl font-bold">Game Title</h1>
// 		<p className="text-lg text-gray-200 mt-2">by DeveloperName</p>
// 	</div>
// </div>
