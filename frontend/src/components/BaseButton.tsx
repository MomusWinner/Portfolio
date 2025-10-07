import React from 'react'

type Props = {
	children: React.ReactNode
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	className?: string
}

export default function BaseButton({ children, onClick, type = 'button', disabled, className = "" }: Props) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={"px-4 py-2 rounded-xl " + className}
			style={{ backgroundColor: "foreground" }
			}
		>
			{children}
		</button >
	)
}
// bg - foreground hover: bg - m - gray text - background disabled: bg - gray - 400 transition
