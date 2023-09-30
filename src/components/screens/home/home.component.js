import BaseScreen from '@/core/components/base-screen/base-screen.component'
import renderService from '@/core/services/render.service'
import { $R } from '@/core/rquery/rquery.lib'

import template from './home.template.html'
import styles from './home.module.scss'

class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = renderService.htmlToElement(template, [], styles)

		$R(element).find('h1').css('color', 'red')

		return element
	}
}

export default Home
