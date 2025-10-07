'use client'

import { Title1 } from "@/components/Title";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const router = useRouter();

	const signin = async function() {
		setError(null)

		try {
			const res = await fetch('/api/v1/auth/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: email, password: password }),
			})

			if (res.status == 404) {
				setError("Incorrect email or password")
			}
			else if (res.status != 200) {
				setError("Something whent wrong")
			}
			else {
				router.push("/admin")
			}
		}
		catch (err: any) {
			setError("Connection Error")
		}
	}

	return (
		<>
			<Title1 className="w-150">Login</Title1>
			<Input label="Email" onChange={(e) => { setEmail(e.target.value) }} />
			<Input label="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
			<Button type="submit" onClick={signin} className="w-20">Login</Button>
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</>
	);
}

