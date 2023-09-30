import ChildComponent from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './header.template.html'
import styles from './header.module.scss'

export class Header extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}

export default Header
