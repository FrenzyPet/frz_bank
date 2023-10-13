import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'
import formService from '@/core/services/form.service'
import { AuthService } from '@/api/auth.service'
import { redQuery } from '@/core/red-query/red-query.lib'

import BaseScreen from '@/core/components/base-screen/base-screen.component'
import { Field, Button } from '@/components/ui'

import template from './auth.template.html'
import styles from './auth.module.scss'
import validationService from '@/core/services/validation.service'

export class Auth extends BaseScreen {
	#isTypeLogin = true

	constructor() {
		super({ title: 'Auth' })
		this.authService = new AuthService()
	}

	#validateFields(formValues) {
		const emailLabel = $R(this.element).find('label:first-child')
		const passwordLabel = $R(this.element).find('label:last-child')

		if (!formValues.email) {
			validationService.showError(emailLabel)
		}

		if (!formValues.password) {
			validationService.showError(passwordLabel)
		}

		return formValues.email && formValues.password
	}

	#handleSubmit = evt => {
		const formValues = formService.getFormValues(evt.target)
		if (!this.#validateFields(formValues)) {
			return
		} else {
			redQuery()
		}
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
