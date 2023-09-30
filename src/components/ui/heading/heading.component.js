import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './heading.template.html'
import styles from './heading.module.scss'

class Heading extends Child {
	constructor({ title }) {
		super()
		this.title = title
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$R(this.element).html(this.title)

		return this.element
	}
}

export default Heading