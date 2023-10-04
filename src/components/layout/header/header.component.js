import ChildComponent from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import { UserItem } from '@/components/ui'

import Logo from './logo/logo.component'
import LogoutButton from './logout-button/logout-button.component'
import Search from './search/search.component'

import template from './header.template.html'
import styles from './header.module.scss'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.router = router
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
		return this.element
	}
}

export default Header
