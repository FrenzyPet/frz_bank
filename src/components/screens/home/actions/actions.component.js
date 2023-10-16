import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'
import validationService from '@/core/services/validation.service'
import { CardService } from '@/api/card.service'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

import { Button, Field } from '@/components/ui'
import { BALANCE_UPDATED } from '@/constants/event.const'

import template from './actions.template.html'
import styles from './actions.module.scss'

class Actions extends Child {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}

	/**
	 *
	 * @param {Event} event - The event object from the button click.
	 * @param {'top-up' | 'withdrawal'} type - The type of the transaction, either 'top-up' or 'withdrawal'
	 */
	updateBalance(event, type) {
		event.preventDefault()

		if (!this.store.user) {
			this.notificationService.show('error', 'You need authorization')
		}

		$R(event.target).text('Sending...').attr('disabled', true)

		const inputElement = $R(this.element).find('input')
		const amount = inputElement.inputValue()

		if (!amount) {
			validationService.showError($R(this.element).find('label'))
			return
		}

		this.cardService.updateBalance(amount, type, () => {
			inputElement.inputValue('')

			const balanceUpdatedEvent = new Event(BALANCE_UPDATED)
			document.dispatchEvent(balanceUpdatedEvent)

			$R(event.target).removeAttr('disabled').text(type)
		})
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'amount',
					placeholder: 'enter amount',
					type: 'number',
				}),
			],
			styles,
		)

		$R(this.element)
			.find('#action-buttons')
			.append(
				new Button({
					children: 'Top-up',
					variant: 'green',
					onClick: e => this.updateBalance(e, 'top-up'),
				}).render(),
			)
			.append(
				new Button({
					children: 'Withdrawal',
					variant: 'purple',
					onClick: e => this.updateBalance(e, 'withdrawal'),
				}).render(),
			)
		return this.element
	}
}

export default Actions
