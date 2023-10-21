import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './statistics.template.html'
import styles from './statistics.module.scss'
import { Store } from '../../../../core/store/store'
import { StatisticService } from '../../../../api/statistic.service'
import Heading from '../../../ui/heading/heading.component'
import { TRANSACTION_COMPLETED } from '@/constants/event.const'
import Loader, {
	LOADER_SELECTOR,
} from '@/components/ui/loader/loader.component'
import StatisticsItem from './statistics-item/statistics-item.component'
import { formatToCurrency } from '../../../../utils/format-to-currency.utils'

class Statistics extends Child {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.statisticService = new StatisticService()

		this.element = renderService.htmlToElement(
			template,
			[new Heading('Statistics')],
			styles,
		)

		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted.bind(this),
		)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted.bind(this),
		)
	}

	#onTransactionCompleted() {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.statisticService.main(data => {
			if (!data) return

			const loaderElement = this.element.querySelector(LOADER_SELECTOR)
			if (loaderElement) loaderElement.remove()

			const statisticsItemsElement = $R(this.element).find('#statistics-items')
			statisticsItemsElement.text('')

			statisticsItemsElement
				.append(
					new StatisticsItem(
						'Income:',
						formatToCurrency(data[0].value),
						'green',
					).render(),
				)
				.append(
					new StatisticsItem(
						'Expense:',
						formatToCurrency(data[1].value),
						'purple',
					).render(),
				)
		})
	}

	render() {
		if (this.store.user) {
			$R(this.element).append(new Loader({ width: 30, height: 30 }).render())
			this.fetchData()
		}

		return this.element
	}
}

export default Statistics
