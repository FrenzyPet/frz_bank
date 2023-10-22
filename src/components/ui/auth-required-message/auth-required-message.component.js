import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './auth-required-message.template.html'
import styles from './auth-required-message.module.scss'

class AuthRequiredMessage extends Child {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}

export default AuthRequiredMessage
