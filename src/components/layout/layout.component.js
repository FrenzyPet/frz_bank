import renderService from '@/core/services/render.service'
import { $R } from '@/core/rquery/rquery.lib'

import Header from './header/header.component'
import Notification from './notification/notification.component'

import template from './layout.template.html'
import styles from './layout.module.scss'
import Child from '@/core/components/child/child.component'
class Layout extends Child {
	constructor({ router, children }) {
		super()

		this.router = router
		this.children = children
	}

	render() {
		this.element = renderService.htmlToElement(template, [Notification], styles)

		const mainElement = $R(this.element).find('main')

		const contentContainer = $R(this.element).find('#content')
		contentContainer.append(this.children)

		mainElement
			.before(new Header({ router: this.router }).render())
			.append(contentContainer.element)

		return this.element
	}
}

export default Layout
