import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {StyleSheet} from 'react-native';
import BackButton from '../../../components/buttons/BackButton';
import {colors} from '../../../utils';
import AdWizard from '../../../components/ad-wizard/AdWizard';
import AdDescription from '../../../components/ad-wizard/AdDescription';
import AdPictures from '../../../components/ad-wizard/AdPictures';
import AdPrice from '../../../components/ad-wizard/AdPrice';
import AdRecap from '../../../components/ad-wizard/AdRecap';
import AdAddress from '../../../components/ad-wizard/AdAddress';
import AdDates from '../../../components/ad-wizard/AdDates';
import AdName from '../../../components/ad-wizard/AdName';
import AdCategorie from "../../../components/ad-wizard/AdCategorie";

function AdUpdate({navigation}) {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			title: "",
			headerBackTitleVisible: false,
			headerTransparent: true,
			headerShadowVisible: false,
			headerLeft: () => (
				<BackButton navigation={navigation} icon="close"/>
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
			<AdWizard>
				<AdCategorie navigation={navigation}/>
				<AdName/>
				<AdDescription/>
				<AdPictures/>
				<AdPrice/>
				<AdDates/>
				<AdAddress/>
				<AdRecap navigation={navigation}/>
			</AdWizard>
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
export default AdUpdate;
