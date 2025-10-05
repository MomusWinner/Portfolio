import { serveStatic } from 'hono/bun'
import { Layout } from './layout'
import { css, cx, keyframes, Style } from 'hono/css'
import { Portfolio } from './portfolio'
import { html, raw } from 'hono/html'
import { env } from 'hono/adapter'
import { SessionRepository } from '../repository/session'

export const BLACK = '#222323';
export const WHITE = '#f0f6f0';

export const backgroundColor = css`
	background-color: ${BLACK};
	color: ${WHITE};
	font-family: "Roboto Slab", serif;
	font-optical-sizing: auto;
	font-weight: 400;
	font-style: normal;
`

