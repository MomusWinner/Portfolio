import { Analitic } from "@/components/Analitic";
import Portfolio from "@/components/Portfolio"

export default function Home() {
	return (
		<>
			<Analitic />
			<Portfolio />
		</>
	);
}

// <>
// 	<div className="font-mono grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 sm:p-20 md:p-40 lg:p-70 pb-20 gap-16 ">
// 		<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
// 			<Title1 className="text-center w-full">Портфолио</Title1>
// 			<div className="flex gap-4 items-center flex-col sm:flex-row">
// 				<a
// 					className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
// 					href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// 					target="_blank"
// 					rel="noopener noreferrer"
// 				>
// 					<Image
// 						className="dark:invert"
// 						src="/vercel.svg"
// 						alt="Vercel logomark"
// 						width={20}
// 						height={20}
// 					/>
// 					Deploy now
// 				</a>
// 				<a
// 					className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
// 					href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// 					target="_blank"
// 					rel="noopener noreferrer"
// 				>
// 					Read our docs
// 				</a>
//
// 			</div>
//
// 			<p>
// 				Я Unity-разработчик с 2+ годами коммерческого опыта, специализируюсь на разработке игровых механик и плагинов.
//
// 				В процессе работы, помимо десктопной разработки, также реализовывал сетевые решения и SDK для них.
// 				Интересуюсь низкоуровневой графикой OpenGL и оптимизацией рендеринга. Стремлюсь к глубокому пониманию работы движков и созданию эффективных решений.
// 			</p>
//
// 			<Title2>Ассистент и машинист</Title2>
// 			<div>
// 				Идея проекта заключается в том, что два игрока сканируют QR-код, который перенаправляет их на веб-страницу с джойстиком для управления игровыми персонажами (Машинист и Ассистент). Для успешного прохождения игры игроки должны действовать сообща.
// 			</div>
// 			<div className="flex justify-center">
// 				<Image
// 					className="w-[70%] h-auto"
// 					src="/project/Machinist_Assistent.png"
// 					alt="Next.js logo"
// 					priority
// 					width={0}
// 					height={0}
// 					sizes="100vw"
// 				/>
// 			</div>
//
//
// 		</main>
// 		<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
// 			<a
// 				className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// 				href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// 				target="_blank"
// 				rel="noopener noreferrer"
// 			>
// 				<Image
// 					aria-hidden
// 					src="/file.svg"
// 					alt="File icon"
// 					width={16}
// 					height={16}
// 				/>
// 				Learn
// 			</a>
// 			<a
// 				className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// 				href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// 				target="_blank"
// 				rel="noopener noreferrer"
// 			>
// 				<Image
// 					aria-hidden
// 					src="/window.svg"
// 					alt="Window icon"
// 					width={16}
// 					height={16}
// 				/>
// 				Examples
// 			</a>
// 			<a
// 				className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// 				href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// 				target="_blank"
// 				rel="noopener noreferrer"
// 			>
// 				<Image
// 					aria-hidden
// 					src="/globe.svg"
// 					alt="Globe icon"
// 					width={16}
// 					height={16}
// 				/>
// 				Go to nextjs.org →
// 			</a>
// 		</footer>
// 	</div>
// </>
//
