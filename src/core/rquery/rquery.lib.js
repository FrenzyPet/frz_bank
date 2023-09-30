// $R('#rrt').find('.rge).css('key', 'value').text('')

/**
 * Represent the RQuery class for working with DOM elements.
 */

class RQuery {
	/**
	 * Create new RQuery instance.
	 * @param {string|HTMLElement} selector - CSS selector string or HTMLElement
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} not found!`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector type')
		}
	}

	/**
	 * Find the first element that matches the specified selector within the selected element
	 * @param {string} selector - CSS selector string to search for within the selected element
	 * @returns {RQuery} A new RQuery instance for the found element
	 */

	find(selector) {
		const element = new RQuery(this.element.querySelector(selector))

		if (element) {
			return element
		} else {
			throw new Error(`Element ${selector} not found`)
		}
	}

	/**
	 * Set the CSS style of the selected element
	 * @param {string} key - the CSS property to set
	 * @param {string} value - the value to set for the CSS property
	 * @returns {RQuery} The current RQuery instance for chaining
	 */

	css(key, value) {
		if (typeof key !== 'string' || typeof value !== 'string') {
			throw new Error('key and value must be strings')
		}

		this.element.style[key] = value
		return this
	}

	append() {}
}

/**
 * Create new RQuery instance for the given selector
 * @param {string|HTMLElement} selector - CSS selector string or HTML Element
 * @returns {RQuery} A new RQuery instance for the given selector
 */

export function $R(selector) {
	return new RQuery(selector)
}
