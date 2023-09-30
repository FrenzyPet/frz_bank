import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './user-item.template.html'
import styles from './user-item.module.scss'

class UserItem extends Child {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}

export default UserItem
