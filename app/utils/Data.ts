import { EMAIL, PHONE } from "./providers";

export const ADD_MEALS = "ADD_MEALS";
export const RESET_MEAL = "RESET_MEAL";
export const SET_NUMBER_OF_CHILDREN = "SET_NUMBER_OF_CHILDREN";
export const SET_MEALS = "SET_MEALS";
export const SET_SELECTED_ITEM_ID = "SET_SELECTED_ITEM_ID";
export const SET_STEP_INDEX = "SET_STEP_INDEX";
export const UPDATE_MEAL = "UPDATE_MEAL";
export const UPDATE_SEARCH_CRITERIA = "UPDATE_SEARCH_CRITERIA";
export const RECOMMEND_TEXT =  "Bonjour, j'ai découvert cette application qui permet de bien manger et moins cher. Je te la recommande";

export const INITIAL_STATE: State = {
	creationWizard: {
		stepIndex: 0,
		numberOfChildren: 0,
		meal: {
			pictures: []
		}
	},
	searchCriteria: {
		address: {
			coordinates: {}
		}
	},
	meals: []
}

export const HELP_LINK = {
  whatsapp :`whatsapp://send?text=&phone=${PHONE}`,
  sms :`sms:${PHONE}body=`,
  mail :`mailto:${EMAIL}`,
  phone :`tel:${PHONE}`
}

export const SHARE_LINK = {
  whatsapp :`whatsapp://send?text=`,
  sms :`sms:body=`,
  mail :`mailto:${EMAIL}`,
  phone :`tel:${PHONE}`
}

export const MORESCREEN_DATA = [
	{
		id: 'recommendations',
		title: "Recommandations",
		items: [
			{
				id: '586',
				icon: 'whatsapp',
				name: 'whatsapp',
				action: 'recommend',
				title: 'Recommandez via whatsapp'
			},
			{
				id: '587',
				icon: 'sms',
				name: 'sms',
				action: 'recommend',
				title: 'Recommandez par sms',
			},
			{
				id: '588',
				icon: 'facebook',
				name: 'facebook',
				action: 'recommend',
				title: 'Aimez notre page facebook',
			},
			{
				id: '589',
				icon: 'thumbs-up',
				name: 'like',
				action: 'recommend',
				title: 'Notez nous sur le store',
			}
		]
	},
	{
		id: 'assistance',
		title: "assistance",
		items: [
			{
				id: '386',
				icon: 'whatsapp',
				name: 'whatsapp',
				action: 'help',
				title: 'Posez votre question via whatsapp',
			},
			{
				id: '387',
				icon: 'sms',
				name: 'sms',
				action: 'help',
				title: 'Posez votre question  par sms',
			},
			{
				id: '389',
				name: 'mail',
				action: 'help',
				icon: 'envelope',
				title: 'Envoyez nous un mail',
			},
			{
				id: '388',
				icon: 'phone-alt',
				name: 'phone',
				action: 'help',
				title: 'Appelez nous',
			}
		]
	}
]
