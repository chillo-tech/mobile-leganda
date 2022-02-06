export const isValidEmail = (value: string) => {
	const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
	return value.trim().length ? EMAIL_REGEXP.test(value) : true;
}
