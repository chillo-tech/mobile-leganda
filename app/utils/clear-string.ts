export const cleanString = (entry: string) => {
	return entry ? entry.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : '';
}
