import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './notification.template.html'
import styles from './notification.module.scss'

class Notification extends Child {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}

export default Notification
