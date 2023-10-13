import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'
import { AuthService } from '@/api/auth.service'

import BaseScreen from '@/core/components/base-screen/base-screen.component'
import { Field, Button } from '@/components/ui'

import template from './auth.template.html'
import styles from './auth.module.scss'

export class Auth extends BaseScreen {
	#isTypeLogin = true

	constructor() {
		super({ title: 'Auth' })
		this.authService = new AuthService()
	}

	#handleSubmit = evt => {
		console.log(evt.target)
	}

	#changeFormType = evt => {
		evt.preventDefault()

		$R(this.element)
			.find('h1')
			.text(this.isTypeLogin ? 'Register' : 'Sign In')

		$R(evt.target).text(this.isTypeLogin ? 'Sign In' : 'Register')

		this.isTypeLogin = !this.isTypeLogin
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Button({ children: 'Submit' })],
			styles,
		)

		$R(this.element)
			.find('#auth-inputs')
			.append(
				new Field({
					placeholder: 'enter email',
					name: 'email',
					type: 'email',
				}).render(),
			)
			.append(
				new Field({
					placeholder: 'enter password',
					name: 'password',
					type: 'password',
				}).render(),
			)

		$R(this.element).find('#change-form-type').click(this.#changeFormType)

		$R(this.element).find('form').submit(this.#handleSubmit)

		return this.element
	}
}

export default Auth
