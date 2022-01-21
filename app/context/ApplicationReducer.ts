import {
	AUTHENTICATED_USER,
	DELETE_KEY,
	INITIAL_STATE,
	RESET_MEAL,
	RESTORE_TOKEN,
	SET_MEALS,
	SET_NUMBER_OF_CHILDREN,
	SET_SELECTED_ITEM_ID,
	SET_STEP_INDEX,
	SIGN_IN,
	SIGN_OUT,
	UPDATE_MEAL,
	UPDATE_SEARCH_CRITERIA,
	UPDATE_USER_INFOS
} from '../utils/Data';

export const ApplicationReducer = (state: State, action: Action) => {
	const {type, data} = action || {};
	switch (type) {
		case DELETE_KEY:
			const next = {...state}
			delete next[data.key]
			return next;

		case RESET_MEAL:
			return {
				...state,
				creationWizard: INITIAL_STATE.creationWizard
			}
		case RESTORE_TOKEN:
			return {
				...state,
				...data
			};
		case SET_MEALS:
			return {
				...state,
				meals: data
			}
		case SET_NUMBER_OF_CHILDREN:
			return {
				...state,
				creationWizard: {
					...state.creationWizard,
					numberOfChildren: data
				}
			}
		case SET_SELECTED_ITEM_ID:
			return {
				...state,
				itemId: data
			}
		case SET_STEP_INDEX:
			return {
				...state,
				creationWizard: {
					...state.creationWizard,
					stepIndex: data
				}
			}

		case SIGN_IN:
			return {
				...state,
				...data
			};

		case SIGN_OUT:
			const signoutState = {...state};
			delete signoutState[AUTHENTICATED_USER];
			return signoutState;

		case UPDATE_MEAL:
			return {
				...state,
				creationWizard: {
					...state.creationWizard,
					stepIndex: data.stepIndex,
					meal: {
						...state.creationWizard.meal,
						...data.meal
					}
				}
			}
		case UPDATE_SEARCH_CRITERIA:
			return {
				...state,
				searchCriteria: {
					...state.searchCriteria,
					...data
				}
			}
		case UPDATE_USER_INFOS:
			return {
				...state,
				authenticatedUser: {
					...state.authenticatedUser,
					...data
				}
			}
	}
	return state;
}
