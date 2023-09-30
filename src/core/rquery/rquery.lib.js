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

	/**
	 * Append new element as child of the selected element
	 * @param {HTMLElement} childElement - new child element to append
	 * @returns  {RQuery} the current RQuery instance for chaining
	 */

	append(childElement) {
		this.element.appendChild(childElement)
		return this
	}

	/**
	 * Insert new element before selected element
	 * @param {HTMLElement} newElement - new element to insert before the selected element
	 * @returns  {RQuery} the current RQuery instance for chaining
	 */

	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error('Element must be an HTMLElement')
		}

		const parentElement = this.element.parentElement

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element)
			return this
		} else {
			throw new Error('Element does not have a parent element')
		}
	}

	/**
	 * Get or set inner HTML of the selected element
	 * @param {string} [htmlContent] - Optional HTML content to set. If not provided, the current inner HTML will be returned.
	 * @returns  {RQuery|string} the current RQuery instance for chaining when setting HTML content, or the current inner HTML when getting
	 */
	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML
		} else {
			this.element.innerHTML = htmlContent
			return this
		}
	}
}

/**
 * Create new RQuery instance for the given selector
 * @param {string|HTMLElement} selector - CSS selector string or HTML Element
 * @returns {RQuery} A new RQuery instance for the given selector
 */

export function $R(selector) {
	return new RQuery(selector)
}
