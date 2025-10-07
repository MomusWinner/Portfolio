import Image from "next/image";

export default function Info() {
	return (
		<div>
			<p className="flex items-center gap-2 ">
				<Image
					aria-hidden
					src="/telegram.svg"
					alt="Telegram icon"
					width={20}
					height={20}
				/>
				<b>@AregKr</b>
			</p>
			<p className="flex items-center gap-2 ">
				<Image
					aria-hidden
					src="/phone.svg"
					alt="Phone Icon"
					width={16}
					height={16}
				/>
				<b>+7 (964) 971-12-88</b>
			</p>
			<p className="flex items-center gap-2 ">
				<Image
					aria-hidden
					src="/email.svg"
					alt="Email Icon"
					width={20}
					height={20}
				/>
				<b>aregkrdan@gmail.com</b>
			</p>

			<a href="https://github.com/MomusWinner" className="flex items-center gap-2 ">
				<Image
					aria-hidden
					src="/github.svg"
					alt="Github Icon"
					width={20}
					height={20}
				/>
				<b>MomusWinner</b>
			</a>
		</div>
	)
}
