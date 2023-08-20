import BaseScreen from '@/core/components/base-screen/base-screen.component'
import renderService from '@/core/services/render.service'
import template from './home.template.html'

class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}
	render() {
		const element = renderService.htmlToElement(template)
		return '<div>Home</div>'
	}
}

export default Home
