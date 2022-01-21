import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ApplicationContext } from '../../context/ApplicationContextProvider';
import { colors, globalStyles, IMAGES_URL } from '../../utils';
import Button from '../buttons/Button';

function MealRecap({navigation}) {
  const image = {uri: `${IMAGES_URL}/thank-you.png`};
	const {resetMeal} = useContext(ApplicationContext);
	const goToList = () => {
		resetMeal();
		navigation.navigate('MealList');
	}
	return (
		<View style={styles.container}>
			<View style={styles.imageWrapper}>
				<Image
					style={styles.image}
					source={image}
				/>
			</View>
			<View>

				<Text style={[globalStyles.inputTitle, {textAlign: 'center'}]}>
					Nous avons vien reçu votre annonce !
				</Text>
				<Text style={{fontSize: 20, lineHeight: 30, textAlign: 'center', marginVertical: 10}}>
					Merci pour votre confiance.
					Votre annonce va être contrôlée dans les prochaines minutes.
				</Text>
				<Text style={{fontSize: 20, lineHeight: 30, textAlign: 'center', marginVertical: 10}}>
					Vous allez recevoir un message, vous confirmant la mise en ligne de votre annonce.
				</Text>
				<Text style={[globalStyles.inputTitle, {textAlign: 'center', marginVertical: 10}]}>
					Une fois de plus MERCI !
				</Text>

			</View>
			<Button label="C'est noté" onPress={goToList}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: '100%',
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		paddingTop: 80,
		paddingHorizontal: 5,
		paddingBottom: 5
	},
	imageWrapper: {
		textAlign: 'center',
		marginVertical: 5,
		alignItems: 'center'
	},
	image: {
		width: 300,
		height: 200
	},
	spinner: {
		fontSize: 80
	}
})
export default MealRecap;
