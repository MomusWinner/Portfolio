"use client";

import { useEffect } from "react";

type Props = {
	tag?: string
}

export function Analitic({ tag }: Props) {
	useEffect(() => {

		console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")
		console.log(tag)
		var url = tag ? "/api/v1/session/" + tag : "/api/v1/session"

		fetch(url, { method: "POST" }).then((r) => {
			if (r.status === 200) {
				const socket = new WebSocket("ws://localhost:7080/api/v1/analitics/ws");
			}
		})
		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				console.log("Пользователь ушёл со страницы");
			} else {
				console.log("Пользователь вернулся");
			}
		};

		const handleWindowFocus = () => console.log("Окно в фокусе");
		const handleWindowBlur = () => console.log("Окно потеряло фокус");

		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("focus", handleWindowFocus);
		window.addEventListener("blur", handleWindowBlur);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("focus", handleWindowFocus);
			window.removeEventListener("blur", handleWindowBlur);
		};
	}, []);

	return (
		<></>
	);
}
