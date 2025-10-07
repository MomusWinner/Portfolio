import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

function checkAuth(res: Response, router: AppRouterInstance, loginPath: string): boolean {
	if (res.status === 401) {
		router.push(loginPath)
		return false
	}

	return true
}

export async function fetchGetAdmin<T>(
	input: string | URL | Request,
	router: AppRouterInstance,
	init: RequestInit = {},
	loginPath = "admin/login"
): Promise<T | null> {
	let defaultInit: RequestInit = {
		method: "GET",
		...init
	}

	var res = await fetch(input, defaultInit)
	if (!checkAuth(res, router, loginPath)) {
		return null
	}

	return (await res.json()) as T
}

export async function fetchPostAdmin(
	input: string | URL | Request,
	router: AppRouterInstance,
	init: RequestInit = {},
	loginPath = "admin/login"
): Promise<Response | null> {
	let defaultInit: RequestInit = {
		method: "POST",
		...init
	}

	var res = await fetch(input, defaultInit)
	if (!checkAuth(res, router, loginPath)) {
		return null
	}

	return res
}

export async function fetchDeleteAdmin(
	input: string | URL | Request,
	router: AppRouterInstance,
	init: RequestInit = {},
	loginPath = "admin/login"
): Promise<Response | null> {
	let defaultInit: RequestInit = {
		method: "DELETE",
		...init
	}

	var res = await fetch(input, defaultInit)
	if (!checkAuth(res, router, loginPath)) {
		return null
	}

	return res
}

export function getLocalDateTimeString(date: Date = new Date()): string {
	return date.toLocaleString();
}
