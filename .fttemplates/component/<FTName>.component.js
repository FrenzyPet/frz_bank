import Child from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import template from './<FTName>.template.html'
import styles from './<FTName>.module.scss'

export class <FTName | pascalcase> extends Child {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}

