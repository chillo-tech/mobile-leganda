type State = {
	authenticatedUser?: {
		location?: any
	}
	searchCriteria: {
		query?: string,
		page?: number,
		size?: number,
		pushResults: boolean,
		location: {
			coordinates?: any
		}
	},
	creationWizard: {
		stepIndex: number,
		numberOfChildren: number,
		ad: any
	},
	ads: any[],
	cats: any[],
}

type Action = {
	type: string,
	data?: any
}

type Picture = {
	id: string;
	name: string;
	uri: string;
	base64: any;
}
