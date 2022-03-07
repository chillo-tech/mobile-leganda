import {EMAIL, PHONE} from "./providers";

export const PLUS_FAVORITES_UPDATED = "Super cette annonce a été ajoutée à vos favoris";
export const REMOVE_FAVORITES_UPDATED = "Cette annonce a été retirée de vos favoris";
export const AUTHENTICATED_USER = "authenticatedUser";
export const MAPBOX_ACCESSTOKEN = "pk.eyJ1IjoiYWNoaWxsZW1ib3VndWVuZyIsImEiOiJja3Zvd3EzcmswaThkMnZrZ25iYmtveDBhIn0.pDR7pKL18d3iz5NoaRmWYg";
export const RESET_AD = "RESET_AD";
export const DELETE_KEY = "DELETE_KEY";
export const SET_NUMBER_OF_CHILDREN = "SET_NUMBER_OF_CHILDREN";
export const SET_ADS = "SET_ADS";
export const SET_AD = "SET_AD";
export const SET_SELECTED_ITEM_ID = "SET_SELECTED_ITEM_ID";
export const SET_STEP_INDEX = "SET_STEP_INDEX";
export const UPDATE_AD = "UPDATE_AD";
export const UPDATE_SEARCH_CRITERIA = "UPDATE_SEARCH_CRITERIA";
export const UPDATE_USER_INFOS = "UPDATE_USER_INFOS";
export const USER_TOKEN = "USER_TOKEN";
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_UP = 'SIGN_UP';
export const RECOMMEND_TEXT = "Bonjour, j'ai découvert cette application qui a de belles annonces. Je te la recommande";
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const AD_PLACEHOLDER = ["Taro du dimanche", "20kg à destination de Yaoundé", "Carton de Guinness", "Stage de developpeur"];
export const INITIAL_STATE: State = {
	creationWizard: {
		stepIndex: 0,
		numberOfChildren: 0,
		ad: {
			pictures: []
		}
	},
	searchCriteria: {
		pushResults: false,
		page: 0,
		size: 6,
		query: '',
		location: {
			coordinates: []
		}
	},
	ads: []
}

export const HELP_LINK = {
	whatsapp: `whatsapp://send?text=&phone=${PHONE}`,
	sms: `sms:${PHONE}body=`,
	mail: `mailto:${EMAIL}`,
	phone: `tel:${PHONE}`
}

export const SHARE_LINK = {
	whatsapp: `whatsapp://send?text=`,
	sms: `sms:body=`,
	mail: `mailto:${EMAIL}`,
	phone: `tel:${PHONE}`
}

export const MORESCREEN_DATA = [
	{
		id: 'recommendations',
		title: "Recommandations",
		items: [
			{
				id: '587',
				icon: 'thumbs-up',
				name: 'sms',
				action: 'recommend',
				title: 'Recommandez notre application',
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
