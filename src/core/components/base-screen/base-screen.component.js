import { getTitle } from '@/config/seo.config'

class BaseScreen {
	/**
	 * Create new BaseScreen instance
	 * @param {Object} options - The options for BaseScreen
	 * @param {string} options.title - The title for screen
	 */
	constructor({ title }) {
		document.title = getTitle(title)
	}

	/**
	 * Render the child component content
	 * @returns {HTMLElement}
	 */
	render() {
		throw new Error('Render method must be implemented in the child class')
	}
}

export default BaseScreen
