import { fetchGetAdmin, getLocalDateTimeString } from '@/helper'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
	id: string
	date?: Date
}

interface TimeInterval {
	id: string,
	sessionId: Date,
	tStart: string,
	tEnd: string
}

export default function TimeIntervalList({ id, date }: Props) {
	const [timeIntervals, setTimeIntervals] = useState<TimeInterval[] | null>(null)
	const router = useRouter();

	useEffect(() => {
		async function fetchTimeIntervals() {
			var timeIntervals: TimeInterval[] | null
			if (date === undefined) {
				timeIntervals = await fetchGetAdmin<TimeInterval[]>("/api/v1/time_interval/session/" + id, router)
			}
			else {
				timeIntervals = await fetchGetAdmin<TimeInterval[]>("/api/v1/time_interval/session/" + id + "/" + formatDate(date), router)
			}
			setTimeIntervals(timeIntervals)
		}

		fetchTimeIntervals()
	}, [setTimeIntervals])

	return (
		<div className="space-y-4 w-full min-w-300">
			<div className="space-y-3">
				{timeIntervals && timeIntervals.map((timeInterval) => (
					<div
						key={timeInterval.id}
						className="flex justify-between items-center bg-background border border-foreground p-4 rounded-2xl"
					>
						<div>

							<h2 className="text-lg font-semibold">
								{timeInterval.id}
							</h2>
						</div>
						<div>
							<p className="text-m-gray text-sm">start: {getLocalDateTimeString(new Date(timeInterval.tStart))}</p>
							<p className="text-m-gray text-sm">end: {getLocalDateTimeString(new Date(timeInterval.tEnd))}</p>

						</div>
						<p>{formatDuration((new Date(timeInterval.tEnd).getTime() - new Date(timeInterval.tStart).getTime()))} sec</p>
					</div>
				))}
			</div>
		</div>
	)
}

function formatDuration(ms: number): string {
	let totalSeconds = Math.floor(ms / 1000);

	const hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;

	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	return `${hours}h ${minutes}m ${seconds}s`;
}

function formatDate(date: Date): string {
	return date.toISOString().split("T")[0];
}
