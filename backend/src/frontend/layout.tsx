import type { FC } from 'hono/jsx'
import { css, cx, keyframes, Style } from 'hono/css'

const layoutClass = css`
	max-width: 800px;
	margin: 0px auto;
	flex-grow: 1;
`
export const Layout: FC = (props) => {
	return (
		<main
			class={layoutClass}
		>
			{props.children}
		</main >
	)
}

export const Top: FC<{ messages: string[] }> = (props: {
	messages: string[]
}) => {
	return (
		<Layout>
			<h1>Hello Hono!</h1>
			<ul>
				{props.messages.map((message) => {
					return <li>{message}!!</li>
				})}
			</ul>
		</Layout>
	)
}
