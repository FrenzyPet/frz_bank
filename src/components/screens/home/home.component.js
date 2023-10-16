import BaseScreen from '@/core/components/base-screen/base-screen.component'
import renderService from '@/core/services/render.service'

import Actions from './actions/actions.component'
import { CardInfo } from './card-info/card-info.component'

import template from './home.template.html'
import styles from './home.module.scss'

class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = renderService.htmlToElement(
			template,
			[CardInfo, Actions],
			styles,
		)

		return element
	}
}

export default Home
