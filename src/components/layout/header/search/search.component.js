import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'
import { UserService } from '@/api/user.service'

import template from './search.template.html'
import styles from './search.module.scss'
import { UserItem } from '@/components/ui'
import { debounce } from '@/utils/debounce.utils'
import { formatCardNumber } from '../../../../utils/format-card-number.utils'
import { TRANSFER_FIELD_SELECTOR } from '../../../screens/home/contacts/transfer-field/transfer-field.component'

class Search extends Child {
	constructor() {
		super()
		this.userService = new UserService()
	}

	#handleSearch = async evt => {
		const searchTerm = evt.target.value
		const searchResultElement = $R(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')

			users.forEach((user, index) => {
				const userItem = new UserItem(user, true, () => {
					$R(TRANSFER_FIELD_SELECTOR).inputValue(
						formatCardNumber(user.card.number),
					)
					searchResultElement.html('')
				}).render()

				$R(userItem)
					.addClass(styles.item)
					.css('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)
				setTimeout(() => $R(userItem).addClass(styles.visible), 50)
			})
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const debounceHandleSearch = debounce(this.#handleSearch, 300)

		$R(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...',
			})
			.on('input', debounceHandleSearch)
		return this.element
	}
}

export default Search
