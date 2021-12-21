import React, {cloneElement, useContext, useEffect} from 'react';
import {View} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';

function MealWizard({children}) {
	const {state: {creationWizard: {stepIndex}}, updateNumberOfChildren} = useContext(ApplicationContext);
	useEffect(() => {
		updateNumberOfChildren(children.length)
	}, []);

	return (
		<View style={{flex: 1}}>
			{children.map((child, index) => {
				if (index === stepIndex) {
					return cloneElement(
						child,
						{
							key: `child-${index}`,
							stepIndex
						});
				}
				return null
			})}
		</View>
	);
}

export default MealWizard;
