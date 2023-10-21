import { $R } from '@/core/rquery/rquery.lib'
import Child from '@/core/components/child/child.component'
import renderService from '@/core/services/render.service'

import template from './transaction-item.template.html'
import styles from './transaction-item.module.scss'
import { formatToDate } from '@/utils/fotmat-to-date'
import { formatToCurrency } from '@/utils/format-to-currency.utils'

class TransactionItem extends Child {
	constructor(transaction) {
		super()

		this.transaction = transaction
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const isIncome = this.transaction.type === 'TOP_UP'
		const name = isIncome ? 'Income' : 'Expense'

		if (isIncome) {
			$R(this.element).addClass(styles.income)
		}

		$R(this.element).find('#transaction-name').text(name)

		$R(this.element)
			.find('#transaction-date')
			.text(formatToDate(this.transaction.createdAt))

		$R(this.element)
			.find('#transaction-amount')
			.text(formatToCurrency(this.transaction.amount))

		return this.element
	}
}

export default TransactionItem
