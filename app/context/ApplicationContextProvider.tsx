import React, {createContext, useState} from 'react';

export const ApplicationContext = createContext(null);

function ApplicationContextProvider({children}) {
	const [selectedId, setSelectedId] = useState([]);
	const [meals, setMeals] = useState([]);
	const [numberOfChildren, setNumberOfChildren] = useState(0);
	const [meal, setMeal] = useState({});
	const [stepIndex, setStepIndex] = useState(0);
	const deleteMealImage = (id) => {
		let currentMeal = meal;
		if (currentMeal.pictures && currentMeal.pictures.length) {
			currentMeal = {...currentMeal, pictures: currentMeal.pictures.filter(item => item.id !== id)}
			setMeal(currentMeal);
		}
	}
	const nextStep = () => {
		if (stepIndex !== numberOfChildren - 1) {
			const newStepIndex = stepIndex + 1;
			setStepIndex(newStepIndex);
		}
	}
	const previousStep = () => {
		if (stepIndex !== 0) {
			const newStepIndex = stepIndex - 1;
			setStepIndex(newStepIndex);
		}
	}
	const updateMeal = ({data, goToNextStep = true}) => {
		setMeal({...meal, ...data});
		if (goToNextStep) {
			nextStep();
		}
	}
	const resetMeal = () => {
		setMeal({});
		setStepIndex(0);
	}
	const updateMeals = (meals) => setMeals(meals);
	const updateNumberOfChildren = (number) => setNumberOfChildren(number);
	return (
		<ApplicationContext.Provider
			value={{
				meals,
				meal,
				stepIndex,
				selectedId,
				numberOfChildren,
				deleteMealImage,
				resetMeal,
				setSelectedId,
				updateNumberOfChildren,
				updateMeal,
				updateMeals,
				previousStep
			}}>
			{children}
		</ApplicationContext.Provider>
	);
}

export default ApplicationContextProvider;
