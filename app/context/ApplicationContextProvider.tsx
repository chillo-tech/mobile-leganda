import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useReducer} from 'react';
import {
	AUTHENTICATED_USER,
	DELETE_KEY,
	INITIAL_STATE,
	RESET_MEAL,
	SET_MEALS,
	SET_NUMBER_OF_CHILDREN,
	SET_SELECTED_ITEM_ID,
	SET_STEP_INDEX,
	SIGN_OUT,
	UPDATE_MEAL,
	UPDATE_SEARCH_CRITERIA,
	UPDATE_USER_INFOS
} from '../utils/Data';
import {ApplicationReducer} from './ApplicationReducer';

export const ApplicationContext = createContext(null);

function ApplicationContextProvider({children}) {
	const [state, dispatch] = useReducer(ApplicationReducer, INITIAL_STATE);
	const {creationWizard: {stepIndex}} = state;
	const authContext = React.useMemo(() => ({
		deleteKey: (data: {}) => dispatch({type: DELETE_KEY, data}),
		goToStep: (stepIndex: number) => dispatch({type: SET_STEP_INDEX, data: stepIndex}),
		previousStep: () => dispatch({type: SET_STEP_INDEX, data: stepIndex <= 0 ? 0 : stepIndex - 1}),
		resetMeal: () => dispatch({type: RESET_MEAL}),
		signIn: async (infos: {}) => {
			// In a production app, we need to send some data (usually username, password) to server and get a token
			// We will also need to handle errors if sign in failed
			// After getting token, we need to persist the token using `SecureStore`
			// In the example, we'll use a dummy token
			const userToken = Math.random().toString(36).substring(2);
			const savedUser = await AsyncStorage.getItem(AUTHENTICATED_USER);
			const parsedUser = JSON.parse(savedUser);
			const authenticatedUser = {...parsedUser, ...infos, userToken}
			dispatch({type: UPDATE_USER_INFOS, data: authenticatedUser});
			await AsyncStorage.setItem(AUTHENTICATED_USER, JSON.stringify(authenticatedUser));
		},
		signOut: async () => {
			// In a production app, we need to send some data (usually username, password) to server and get a token
			// We will also need to handle errors if sign in failed
			// After getting token, we need to persist the token using `SecureStore`
			await AsyncStorage.removeItem(AUTHENTICATED_USER);
			dispatch({type: SIGN_OUT});
		},
		updateNumberOfChildren: (data: number) => dispatch({type: SET_NUMBER_OF_CHILDREN, data}),
		updateSelectedItemId: (data: number) => dispatch({type: SET_SELECTED_ITEM_ID, data}),
		updateMeal: ({infos = {}, goToNextStep = true}) => {
			const nextStep = goToNextStep ? stepIndex + 1 : stepIndex;
			dispatch({type: UPDATE_MEAL, data: {meal: infos, stepIndex: nextStep}});
		},
		updateMeals: (meals: []) => dispatch({type: SET_MEALS, data: meals}),
		updateSearchCriteria: (data: {}) => {
			dispatch({type: UPDATE_SEARCH_CRITERIA, data})
		},
		updateUserInfos: async (data: {}) => {
			const savedUser = await AsyncStorage.getItem(AUTHENTICATED_USER);
			const parsedUser = JSON.parse(savedUser);
			const authenticatedUser = {...parsedUser, ...data}
			dispatch({type: UPDATE_USER_INFOS, data: authenticatedUser});
			await AsyncStorage.setItem(AUTHENTICATED_USER, JSON.stringify(authenticatedUser));
		}
	}), [state]);

	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let authenticatedUser;
			try {
				authenticatedUser = await AsyncStorage.getItem(AUTHENTICATED_USER);
			} catch (e) {
				// Restoring token failed
			}

			// After restoring token, we may need to validate it in production apps

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			if (authenticatedUser) {
				dispatch({type: UPDATE_USER_INFOS, data: JSON.parse(authenticatedUser)});
			}
		};

		bootstrapAsync();
	}, []);
	return (
		<ApplicationContext.Provider value={{state, ...authContext}}>
			{children}
		</ApplicationContext.Provider>
	);
}

export default ApplicationContextProvider;
