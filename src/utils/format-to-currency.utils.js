/**
 * Formats a number as a string with the specified currency symbol.
 *
 * @param {number} number - The number to be converted into currency format.
 * @returns {string} The formatted number with the currency symbol.
 */
export const formatToCurrency = number =>
	new Intl.NumberFormat('ru-RU', {
		currency: 'RUB',
		style: 'currency',
	}).format(number)
