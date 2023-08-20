import BaseScreen from '@/core/components/base-screen/base-screen.component'

class NotFound extends BaseScreen {
	constructor() {
		super({ title: 'Not found' })
	}

	render() {
		return '<div>NOT FOUND 404</div>'
	}
}

export default NotFound
