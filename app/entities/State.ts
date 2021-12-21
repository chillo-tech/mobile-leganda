type State = {
	searchCriteria: {
		address: {
			coordinates: any
		}
	},
	creationWizard: {
		stepIndex: number,
		numberOfChildren: number,
		meal: any
	},
	meals: any[]
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