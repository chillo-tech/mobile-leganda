import {
	ADD_MEALS,
	INITIAL_STATE,
	RESET_MEAL,
	SET_MEALS,
	SET_NUMBER_OF_CHILDREN,
	SET_SELECTED_ITEM_ID,
	SET_STEP_INDEX,
	UPDATE_MEAL,
	UPDATE_SEARCH_CRITERIA
} from '../utils/Data';

export const ApplicationReducer = (state: State, action: Action) => {
	const {type, data} = action || {};

	switch (type) {
		case SET_NUMBER_OF_CHILDREN:
			return {
				...state,
				creationWizard: {
					...state.creationWizard,
					numberOfChildren: data
				}
			}
		case ADD_MEALS:
			return {
				...state
			}
		case RESET_MEAL:
			return {
				...state,
				creationWizard: INITIAL_STATE.creationWizard
			}
		case SET_MEALS:
			return {
				...state,
				meals: data
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
	}
	return state;
}
