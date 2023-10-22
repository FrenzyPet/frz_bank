import Loader, {
	LOADER_SELECTOR,
} from '@/components/ui/loader/loader.component'
import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'
import { UserService } from '../../../../api/user.service'
import { NotificationService } from '@/core/services/notification.service'

import { Heading, UserItem } from '@/components/ui'
import TransferField, {
	TRANSFER_FIELD_SELECTOR,
} from './transfer-field/transfer-field.component'

import template from './contacts.template.html'
import styles from './contacts.module.scss'
import { formatCardNumber } from '@/utils/format-card-number.utils'

class Contacts extends Child {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.userService = new UserService()
		this.notificationService = new NotificationService()
	}

	fetchData() {
		this.userService.getAll(null, data => {
			if (!data) return

			this.element.querySelector(LOADER_SELECTOR).remove()

			for (const user of data) {
				$R(this.element)
					.find('#contacts-list')
					.append(
						new UserItem(user, true, () => {
							$R(TRANSFER_FIELD_SELECTOR).inputValue(
								formatCardNumber(user.card.number),
							)
						}).render(),
					)
			}

			$R(this.element)
				.find('#contacts-list')
				.findAll('button')
				.forEach(contactElement => contactElement.addClass('fade-in'))
		})
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[TransferField, new Heading('Transfer money')],
			styles,
		)

		if (this.store.user) {
			$R(this.element)
				.find('#contacts-list')
				.html(new Loader({ width: 30, height: 30 }).render().outerHTML)

			setTimeout(() => this.fetchData(), 500)
		}

		return this.element
	}
}

export default Contacts
