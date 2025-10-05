import { useState, useEffect, type FC } from 'hono/jsx'
import { css, cx, keyframes, Style } from 'hono/css'

const portfolioClass = css`
`

const title1Class = css`
	text-align: center;
`

const title2Class = css`
	text-align: center;
`

const projectClass = css`
	// margin: 0px 50px 0px;
`

const imageClass = css`
	width: 100%;
	height: auto;
	display: block;
	margin: 10px 0px;
`

const topOffsetClass = css`
	height: 30px;
`

export const Title1: FC = (props) => { return (<h1 class={title1Class}>{props.children}</h1>) }
export const Title2: FC = (props) => { return (<h3 class={title2Class}>{props.children}</h3>) }

export const Image: FC = (props) => { return (<image class={imageClass} src={props.src} />) }

export const Project: FC = (props) => {
	return (
		<div class={projectClass}>
			{props.children}
		</div>
	)
}

export const TopOffset: FC = () => { return (<div class={topOffsetClass}></div>) }

export const Admin: FC = () => {
	return (
		<div class={portfolioClass}>
			<TopOffset />
			<Title1>Admin Panel</Title1>
			<p>
				важные данные
			</p>
		</div>
	)
}
