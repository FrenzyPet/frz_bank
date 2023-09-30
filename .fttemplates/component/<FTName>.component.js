import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './<FTName>.template.html'
import styles from './<FTName>.module.scss'

class <FTName | pascalcase> extends Child {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}

export default <FTName | pascalcase>


