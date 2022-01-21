import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import BackButton from '../../../components/buttons/BackButton';
import MealActivation from '../../../components/MealWizard/MealActivation';
import MealAddress from '../../../components/MealWizard/MealAddress';
import MealDates from '../../../components/MealWizard/MealDates';
import MealDescription from '../../../components/MealWizard/MealDescription';
import MealName from '../../../components/MealWizard/MealName';
import MealPictures from '../../../components/MealWizard/MealPictures';
import MealPrice from '../../../components/MealWizard/MealPrice';
import MealProvider from '../../../components/MealWizard/MealProvider';
import MealRecap from '../../../components/MealWizard/MealRecap';
import MealWizard from '../../../components/MealWizard/MealWizard';
import { colors } from '../../../utils/Styles';

function MealUpdate({navigation}) {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			title: "",
			headerBackTitleVisible: false,
			headerTransparent: true,
			headerShadowVisible: false,
			headerLeft: () => (
				<BackButton navigation={navigation} icon="closecircle"/>
			),
		});
	}, [navigation]);
	return (
		<LinearGradient
			start={{x: 0, y: 0}}
			end={{x: 1, y: 1}}
			colors={[colors.warning, colors.primary]}
			style={styles.container}
		>
			<MealWizard>
				<MealName/>
				<MealDescription/>
				<MealPictures/>
				<MealPrice/>
				<MealDates/>
				<MealAddress/>
				<MealProvider/>
				<MealActivation/>
				<MealRecap navigation={navigation}/>
			</MealWizard>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({

	buttonView: {
		marginBottom: 10
	},
	container: {
		backgroundColor: 'red',
		width: '100%',
		marginTop: 0,
		flex: 1,
		flexDirection: 'column'
	}

});
export default MealUpdate;
