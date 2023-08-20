class Child {
	/**
	 * Render the child component content
	 * @returns {HTMLElement}
	 */

	render() {
		throw new Error('Render method must be implemented in the child class')
	}
}

export default Child
