import { fetchGetAdmin, getLocalDateTimeString } from '@/helper'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
	id: string
}

interface Session {
	id: string;
	tag: string | null;
	ip: string;
	createdAt: string;
	alias?: string | null;
	totalTime?: string | null;
}

export default function Session({ id }: Props) {
	const [session, setSession] = useState<Session | null>(null)
	const router = useRouter();

	useEffect(() => {
		async function fetchSession() {
			var session = await fetchGetAdmin<Session>("/api/v1/session/" + id, router)
			setSession(session)
		}

		fetchSession()
	}, [setSession])

	return (
		<div className="w-full min-w-300">
			{session &&
				<div
					key={session.id}
					className="bg-background border border-foreground p-4 rounded-2xl"
				>
					<p><span className="font-bold">IP: </span>{session.ip}</p>
					<p><span className="font-bold">Tag: </span>{session.tag ?? "null"}</p>
					<p><span className="font-bold">Alias: </span>{session.alias ?? "null"}</p>
					<p><span className="font-bold">Created At: </span>{getLocalDateTimeString(new Date(session.createdAt))}</p>
				</div>
			}
		</div>
	)
}
