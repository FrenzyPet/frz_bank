import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './field.template.html'
import styles from './field.module.scss'

class Field extends Child {
	constructor({ placeholder, type = 'text', value = '', name, variant }) {
		super()

		if (!name) throw new Error('Fill field "name"!')

		this.placeholder = placeholder
		this.type = type
		this.value = value
		this.name = name
		this.variant = variant
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const inputElement = $R(this.element).find('input').input({
			placeholder: this.placeholder,
			type: this.type,
			value: this.value,
			name: this.name,
		})

		if (this.type === 'number') {
			inputElement.numberInput()
		}

		const isCreditCard = this.variant === 'credit-card'

		if (isCreditCard) {
			inputElement.creditCardInput()
		}

		return this.element
	}
}

export default Field
