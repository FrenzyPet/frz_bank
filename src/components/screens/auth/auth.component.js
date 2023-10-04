import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import { Heading } from '@/components/ui'

import BaseScreen from '@/core/components/base-screen/base-screen.component'

import template from './auth.template.html'
import styles from './auth.module.scss'

export class Auth extends BaseScreen {
	constructor() {
		super({ title: 'Auth' })
	}
	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Heading('Auth')],
			styles,
		)
		return this.element
	}
}

export default Auth
