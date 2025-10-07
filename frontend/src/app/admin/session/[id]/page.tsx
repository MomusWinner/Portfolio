'use client'

import { Title1, Title2, Title3 } from "@/components/Title";
import Session from "@/components/Session";
import TimeIntervalList from "@/components/TimeIntervalList";
import React from "react";
interface SessionPageProps {
	params: Promise<{ id: string }>
}

export default function SessionPage({ params }: SessionPageProps) {
	const { id } = React.use(params);

	return (
		<>
			<Title1 className="text-center w-full">{"Session: " + id}</Title1>
			<Session id={id} />
			<br />

			<Title2>Time Intervals</Title2>
			<Title3>Today</Title3>
			<TimeIntervalList id={id} date={new Date()} />
			<Title3>Yesterday</Title3>
			<TimeIntervalList id={id} date={subtractDays(new Date(), 1)} />
			<Title3>Yesterday and the day before</Title3>
			<TimeIntervalList id={id} date={subtractDays(new Date(), 2)} />
			<Title3>All</Title3>
			<TimeIntervalList id={id} />
		</>
	);
}

function subtractDays(date: Date, days: number): Date {
	return new Date(date.getTime() - 24 * 60 * 60 * 1000 * days);
}
