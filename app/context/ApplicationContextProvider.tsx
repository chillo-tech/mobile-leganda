import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useReducer} from 'react';
import {
	AUTHENTICATED_USER,
	DELETE_KEY,
	INITIAL_STATE,
	RESET_AD,
	SET_AD,
	SET_ADS,
	SET_NUMBER_OF_CHILDREN,
	SET_SELECTED_ITEM_ID,
	SET_STEP_INDEX,
	SIGN_IN,
	SIGN_OUT,
	UPDATE_AD,
	UPDATE_SEARCH_CRITERIA,
	UPDATE_USER_INFOS
} from '../utils';
import {ApplicationReducer} from './ApplicationReducer';

export const ApplicationContext = createContext(null);

function ApplicationContextProvider({children}) {
	const [state, dispatch] = useReducer(ApplicationReducer, INITIAL_STATE);
	const {creationWizard: {stepIndex}} = state;
	const authContext = React.useMemo(() => ({
		deleteKey: (data: {}) => dispatch({type: DELETE_KEY, data}),
		goToStep: (stepIndex: number) => dispatch({type: SET_STEP_INDEX, data: stepIndex}),
		previousStep: () => dispatch({type: SET_STEP_INDEX, data: stepIndex <= 0 ? 0 : stepIndex - 1}),
		resetAd: () => dispatch({type: RESET_AD}),
		signIn: async (infos: {}) => {
			dispatch({type: SIGN_IN, data: infos});
			await AsyncStorage.setItem(AUTHENTICATED_USER, JSON.stringify(infos));
		},
		signOut: async () => {
			await AsyncStorage.removeItem(AUTHENTICATED_USER);
			dispatch({type: SIGN_OUT});
		},
		updateNumberOfChildren: (data: number) => dispatch({type: SET_NUMBER_OF_CHILDREN, data}),
		updateSelectedItemId: (data: number) => dispatch({type: SET_SELECTED_ITEM_ID, data}),
		updateAd: ({infos = {}, goToNextStep = true}) => {
			const nextStep = goToNextStep ? stepIndex + 1 : stepIndex;
			dispatch({type: UPDATE_AD, data: {ad: infos, stepIndex: nextStep}});
		},
		updateAds: (ads: []) => dispatch({type: SET_ADS, data: ads}),
		selectedAd: (ad: {}) => dispatch({type: SET_AD, data: ad}),
		updateSearchCriteria: (data: {}) => {
			dispatch({type: UPDATE_SEARCH_CRITERIA, data})
		},
		updateUserInfos: async (data: {}) => {
			let savedUser = await AsyncStorage.getItem(AUTHENTICATED_USER);
			if (savedUser === null) {
				savedUser = "{}";
			}
			const parsedUser = JSON.parse(savedUser);
			const authenticatedUser = {...parsedUser, ...data}
			dispatch({type: UPDATE_USER_INFOS, data: authenticatedUser});
			await AsyncStorage.setItem(AUTHENTICATED_USER, JSON.stringify(authenticatedUser));
		}
	}), [state]);

	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let authenticatedUser = await AsyncStorage.getItem(AUTHENTICATED_USER);
			authenticatedUser = JSON.parse(authenticatedUser);
			if (authenticatedUser && authenticatedUser['accessToken']) {
				dispatch({type: SIGN_IN, data: authenticatedUser});
			} else {
				await AsyncStorage.removeItem(AUTHENTICATED_USER);
				dispatch({type: SIGN_OUT})
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
