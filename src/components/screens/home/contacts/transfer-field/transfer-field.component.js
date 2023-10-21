import { BALANCE_UPDATED, TRANSACTION_COMPLETED } from '@/constants/event.const'
import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'
import validationService from '@/core/services/validation.service'
import { CardService } from '@/api/card.service'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

import template from './transfer-field.template.html'
import styles from './transfer-field.module.scss'
import { Button, Field } from '@/components/ui'

export const TRANSFER_FIELD_SELECTOR = '[name="card-number"'

class TransferField extends Child {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}

	handleTransfer = event => {
		event.preventDefault()

		if (!this.store.user) {
			this.notificationService.show('error', 'You need authorization')
		}

		$R(event.target).text('Sending...').attr('disabled', true)

		const inputElement = $R(this.element).find('input')
		const toCardNumber = inputElement.inputValue().replaceAll('-', '')

		const reset = () => {
			$R(event.target).removeAttr('disabled').text('Send')
		}

		if (!toCardNumber) {
			validationService.showError($R(this.element).find('label'))
			reset()
			return
		}

		let amount = prompt('Transfer amount:')

		this.cardService.transfer({ amount, toCardNumber }, () => {
			inputElement.inputValue('')
			amount = ''

			document.dispatchEvent(new Event(TRANSACTION_COMPLETED))
			document.dispatchEvent(new Event(BALANCE_UPDATED))
		})

		reset()
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'card-number',
					placeholder: 'xxxx-xxxx-xxxx-xxxx',
					variant: 'credit-card',
				}),
				new Button({
					children: 'Send',
					variant: 'purple',
					onClick: this.handleTransfer,
				}),
			],
			styles,
		)
		return this.element
	}
}

export default TransferField
