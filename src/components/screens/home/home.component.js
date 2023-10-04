import { $R } from '@/core/rquery/rquery.lib'
import BaseScreen from '@/core/components/base-screen/base-screen.component'
import renderService from '@/core/services/render.service'

import { Heading, UserItem } from '@/components/ui'

import template from './home.template.html'
import styles from './home.module.scss'
import Field from '../../ui/field/field.component'

class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = renderService.htmlToElement(template, [], styles)

		// $R(element).find('h1').css('color', 'red')

		return element
	}
}

export default Home
