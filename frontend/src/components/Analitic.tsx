"use client";

import { hostname } from "os";
import { useEffect } from "react";

type Props = {
	tag?: string;
};

export function Analitic({ tag }: Props) {
	useEffect(() => {
		var url = tag ? "/api/v1/session/" + tag : "/api/v1/session";

		fetch(url, { method: "POST" }).then((r) => {
			if (r.status === 200) {
				let socket: WebSocket
				let protocol: string
				let port: string = ""

				if (location.protocol === 'https:') {
					protocol = "wss://"
				} else {
					protocol = "ws://"
				}

				socket = new WebSocket(protocol + location.host + "/api/v1/analitics/ws");
			}
		});

		// const handleVisibilityChange = () => {
		// 	if (document.visibilityState === "hidden") {
		// 		console.log("Пользователь ушёл со страницы");
		// 	} else {
		// 		console.log("Пользователь вернулся");
		// 	}
		// };

		// const handleWindowFocus = () => console.log("Окно в фокусе");
		// const handleWindowBlur = () => console.log("Окно потеряло фокус");

		// document.addEventListener("visibilitychange", handleVisibilityChange);
		// window.addEventListener("focus", handleWindowFocus);
		// window.addEventListener("blur", handleWindowBlur);

		return () => {
			// document.removeEventListener("visibilitychange", handleVisibilityChange);
			// window.removeEventListener("focus", handleWindowFocus);
			// window.removeEventListener("blur", handleWindowBlur);
		};
	}, []);

	return <></>;
}
