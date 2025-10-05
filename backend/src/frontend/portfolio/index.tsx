import { useEffect, useState } from 'hono/jsx/dom'
import { type FC } from 'hono/jsx'
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

export const Portfolio: FC = () => {
	return (
		<>
			<div class={portfolioClas} >
				<TopOffset />
				<Title1>Крдян Арег</Title1>
				<p>
					Я Unity-разработчик с 2+ годами коммерческого опыта, специализируюсь на разработке игровых механик и плагинов.

					В процессе работы, помимо десктопной разработки, также реализовывал сетевые решения и SDK для них.
					Интересуюсь низкоуровневой графикой OpenGL и оптимизацией рендеринга. Стремлюсь к глубокому пониманию работы движков и созданию эффективных решений.
				</p>
				<Project>
					<Title2>Ассистент и машинист</Title2>
					<div>
						Идея проекта заключается в том, что два игрока сканируют QR-код, который перенаправляет их на веб-страницу с джойстиком для управления игровыми персонажами (Машинист и Ассистент). Для успешного прохождения игры игроки должны действовать сообща.
					</div>
					<Image src='static/Machinist_Assistent.png' />
				</Project>
			</div>
		</>
	)
}
