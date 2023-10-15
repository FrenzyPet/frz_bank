import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import template from './logout-button.template.html'
import styles from './logout-button.module.scss'

class LogoutButton extends Child {
	constructor({ router }) {
		super()
		this.store = Store.getInstance()
		this.user = this.store.state.user
		this.router = router
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		$R(this.element)
			.find('button')
			.click(() => {
				this.store.logout()
				this.router.navigate('/auth')
			})
		return this.element
	}
}

export default LogoutButton
