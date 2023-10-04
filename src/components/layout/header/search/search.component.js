import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './search.template.html'
import styles from './search.module.scss'

class Search extends Child {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$R(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...',
			})
		return this.element
	}
}

export default Search
