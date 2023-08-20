import BaseScreen from '@/core/components/base-screen/base-screen.component'
import renderService from '@/core/services/render.service'
import template from './home.template.html'
import styles from './home.module.scss'

class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}
	render() {
		const element = renderService.htmlToElement(template, [], styles)
		return element.outerHTML
	}
}

export default Home
