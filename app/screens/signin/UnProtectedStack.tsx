import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ValidationScreen from './ValidationScreen';
import SignUpScreen from './SignUpScreen';
import NewPasswordScreen from './NewPasswordScreen';
import LoginScreen from './LoginScreen';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {colors} from '../../utils/Styles';


const Stack = createNativeStackNavigator();

function UnProtectedStack() {
	const {state} = React.useContext(ApplicationContext);
	return (
		<View style={styles.container}>
			<ImageBackground source={require('../../../assets/images/poulet.jpeg')} resizeMode="cover"
							 style={styles.image}>
				<View style={[styles.bodyWrapper]}>
					<View style={styles.logoWrapper}>
						<Image style={styles.logo} resizeMode="cover"
							   source={require("../../../assets/images/logo.png")}/>

					</View>
					<View style={styles.contentWrapper}>
						<Stack.Navigator initialRouteName='Login'>
							{state.validate ?
								<Stack.Screen name="Validation" component={ValidationScreen}
											  options={{title: 'Validez votre compte'}}/>
								:
								(
									<>
										<Stack.Screen name="SignUp" component={SignUpScreen}
													  options={{title: 'Créer un compte'}}/>
										<Stack.Screen name="Login" component={LoginScreen}
													  options={{headerShown: false, title: 'Me connecter'}}/>
										<Stack.Screen name="UpdatePassword" component={NewPasswordScreen}
													  options={{title: 'Modifier mon mot de passe'}}/>
									</>
								)}
						</Stack.Navigator>
					</View>
				</View>

			</ImageBackground>
		</View>
	)
}


const styles = StyleSheet.create({
	bodyWrapper: {
		width: '100%',
		height: "100%",
		marginTop: 0,
		backgroundColor: "rgba(0, 0, 0,0.3)",
		justifyContent: "space-between"
	},
	container: {
		flex: 1
	},
	contentWrapper: {
		backgroundColor: colors.white,
		paddingVertical: 10,
		borderRadius: 5,
		marginHorizontal: 5,
		marginVertical: 10
	},
	image: {
		height: "100%"
	},
	logo: {
		padding: 0,
		width: 80,
		height: 80
	},
	logoWrapper: {
		paddingTop: 20,
		paddingHorizontal: 5
	}
})
export default UnProtectedStack;
