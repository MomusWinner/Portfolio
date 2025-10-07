'use client'

import { Title1, Title2 } from "@/components/Title";
import SessionList from "@/components/SessionList";
import Link from "next/link";

export default function AdminPanel() {
	return (
		<>
			<Title1 className="text-center w-full">Admin</Title1>
			<Link href="/admin/alias">Alias</Link>
			<Title2>Sessions</Title2>
			<SessionList />
		</>
	);
}

