import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {PresentationScreen, SignUpScreen, ValidationScreen} from '../screens/opened';
import LocationSearchScreen from '../screens/shared/LocationSearchScreen';
import {colors} from '../utils';
import {StyleSheet} from 'react-native';
import LoginOptionScreen from '../screens/opened/LoginOptionScreen';
import UserPhoneScreen from '../screens/opened/UserPhoneScreen';

function OpenedStack() {
	const Stack = createNativeStackNavigator();

	return (
		<LinearGradient
			start={{x: 0, y: 0}}
			end={{x: 1, y: 1}}
			colors={[colors.warning, colors.primary]}
			style={styles.container}
		>
			<Stack.Navigator>
				<Stack.Screen
					name="Presentation"
					component={PresentationScreen}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="loginoption"
					component={LoginOptionScreen}
				/>
				<Stack.Screen
					name="phonescreen"
					component={UserPhoneScreen}
				/>
				<Stack.Screen
					name="accountValidation"
					component={ValidationScreen}
				/>
				<Stack.Screen
					name="signup"
					component={SignUpScreen}
				/>

				<Stack.Screen
					name="location"
					component={LocationSearchScreen}
					options={{headerShown: false}}
					initialParams={{
						title: 'Indiquez votre position',
						subtitle: 'elle permet de proposer des lieux proche',
						buttonLabel: 'Valider',
						placeholder: 'Recherchez votre ville',
						nextPage: 'ads',
						stack: 'opened',
						cancellable: false,
						userLocation: true
					}}
				/>
			</Stack.Navigator>
		</LinearGradient>
	)
}


const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginTop: 0,
		flex: 1,
		flexDirection: 'column'
	}
});

export default OpenedStack;

