import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './circle-chart.template.html'
import styles from './circle-chart.module.scss'
import DonutChart from '../../../../ui/donut-chart/donut-chart.component'

class CircleChart extends Child {
	constructor(incomePercent, expensePercent) {
		super()
		this.incomePercent = incomePercent
		this.expensePercent = expensePercent
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new DonutChart([
					{ value: this.incomePercent, color: '#08f0c8' },
					{ value: this.expensePercent, color: '#917cff' },
				]),
			],
			styles,
		)

		return this.element
	}
}

export default CircleChart
