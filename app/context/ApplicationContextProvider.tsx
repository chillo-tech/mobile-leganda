import React, {createContext, useReducer} from 'react';
import {ApplicationReducer} from './ApplicationReducer';
import {
	INITIAL_STATE,
	RESET_MEAL,
	SET_MEALS,
	SET_NUMBER_OF_CHILDREN,
	SET_SELECTED_ITEM_ID,
	SET_STEP_INDEX,
	UPDATE_MEAL,
	UPDATE_SEARCH_CRITERIA
} from '../utils/Data';

export const ApplicationContext = createContext(null);

function ApplicationContextProvider({children}) {
	const [state, dispatch] = useReducer(ApplicationReducer, INITIAL_STATE);
	const {creationWizard: {stepIndex}} = state;
	const goToStep = (stepIndex: number) => dispatch({type: SET_STEP_INDEX, data: stepIndex});
	const resetMeal = () => dispatch({type: RESET_MEAL});
	const previousStep = () => dispatch({type: SET_STEP_INDEX, data: stepIndex <= 0 ? 0 : stepIndex - 1});
	const updateNumberOfChildren = (data: number) => dispatch({type: SET_NUMBER_OF_CHILDREN, data});
	const updateSelectedItemId = (data: number) => dispatch({type: SET_SELECTED_ITEM_ID, data});
	const updateMeal = ({data = {}, goToNextStep = true}) => dispatch({
		type: UPDATE_MEAL,
		data: {meal: data, stepIndex: goToNextStep ? stepIndex + 1 : stepIndex}
	});
	const updateMeals = (meals: []) => dispatch({type: SET_MEALS, data: meals});
	const updateSearchCriteria = (data: {}) => dispatch({type: UPDATE_SEARCH_CRITERIA, data});
	return (
		<ApplicationContext.Provider
			value={{
				state,
				goToStep,
				previousStep,
				resetMeal,
				updateSelectedItemId,
				updateSearchCriteria,
				updateNumberOfChildren,
				updateMeal,
				updateMeals
			}}>
			{children}
		</ApplicationContext.Provider>
	);
}

export default ApplicationContextProvider;
