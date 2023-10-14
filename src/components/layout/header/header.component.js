import { $R } from '@/core/rquery/rquery.lib'
import ChildComponent from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import { UserItem } from '@/components/ui'

import Logo from './logo/logo.component'
import LogoutButton from './logout-button/logout-button.component'
import Search from './search/search.component'
import Store from '@/core/store/store'

import template from './header.template.html'
import styles from './header.module.scss'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()
		this.store.addObserver(this)
		this.router = router
	}

	update() {
		this.user = this.store.state.user

		const authSideElement = $R(this.element).find('#auth-side')

		if (this.user) {
			authSideElement.show()
			this.router.navigate('/')
		} else {
			authSideElement.hide()
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutButton({ router: this.router }),
				Search,
				new UserItem({ name: 'Max', avatarPath: 'asd' }),
			],
			styles,
		)

		this.update()
		return this.element
	}
}

export default Header
