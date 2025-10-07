import { fetchGetAdmin, getLocalDateTimeString } from '@/helper'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Session } from '@/models'

type Props = {
	id: string
}

export default function SessionSingle({ id }: Props) {
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
				<div key={session.id} className="bg-background border border-foreground p-4 rounded-2xl">
					<p><span className="font-bold">IP: </span>{session.ip}</p>
					<p><span className="font-bold">Tag: </span>{session.tag ?? "null"}</p>
					<p><span className="font-bold">Alias: </span>{session.alias ?? "null"}</p>
					<p><span className="font-bold">Device: </span>{session.device ?? "null"}</p>
					<p><span className="font-bold">Created At: </span>{getLocalDateTimeString(new Date(session.createdAt))}</p>
				</div>
			}
		</div>
	)
}
