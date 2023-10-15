/**
 * Formats credit card number string by dashes.
 * @param {string} cardNumber - The credit card number string to format.
 * @returns {string} - Return the formatted credit card number string.
 */
export const formatCardNumber = cardNumber => {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}
