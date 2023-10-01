import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './loader.template.html'

export const LOADER_SELECTOR = '[data-component="loader"]'

class Loader extends Child {
	constructor({ width = 100, height = 100 }) {
		super()

		this.width = width
		this.height = height
	}

	render() {
		this.element = renderService.htmlToElement(template, [])

		$R(this.element)
			.css('width', `${this.width}px`)
			.css('height', `${this.height}px`)
			.addClass('bounce')

		return this.element
	}
}

export default Loader
