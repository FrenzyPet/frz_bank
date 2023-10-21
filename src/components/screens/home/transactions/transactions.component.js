import styles from './transactions.module.scss'
import template from './transactions.template.html'
import { Store } from '../../../../core/store/store'
import Child from '../../../../core/components/child/child.component'
import { TRANSACTION_COMPLETED } from '@/constants/event.const'
import Heading from '../../../ui/heading/heading.component'
import { TransactionService } from '@/api/transaction.service'
import { LOADER_SELECTOR } from '@/components/ui/loader/loader.component'
import TransactionItem from './transaction-item/transaction-item.component'
import { $R } from '@/core/rquery/rquery.lib'
import Loader from '@/components/ui/loader/loader.component'
import renderService from '@/core/services/render.service'

export class Transactions extends Child {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.transactionService = new TransactionService()

		this.element = renderService.htmlToElement(
			template,
			[new Heading('Recent transactions')],
			styles,
		)
		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted,
		)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted,
		)
	}

	#onTransactionCompleted = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.transactionService.getAll(data => {
			if (!data) return

			const loaderElement = this.element.querySelector(LOADER_SELECTOR)
			if (loaderElement) loaderElement.remove()

			const transactionsList = $R(this.element).find('#transactions-list')
			transactionsList.text('')

			if (data.length) {
				for (const transaction of data.transactions) {
					transactionsList.append(new TransactionItem(transaction).render())
				}
			} else {
				transactionsList.text('Transactions not found!')
			}
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
