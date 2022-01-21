import React from 'react';
import {Alert, FlatList, Linking, SafeAreaView, Share, StyleSheet} from 'react-native';
import ListCategoryComponent from '../../../components/more-screen/ListCategoryComponent';
import ListHeaderComponent from '../../../components/more-screen/ListHeaderComponent';
import {HELP_LINK, MORESCREEN_DATA} from '../../../utils/Data';
import {colors} from '../../../utils/Styles';

const MoreScreen = () => {

	const askHelp = async (item) => {
		const {name} = item;
		const link: string = HELP_LINK[name];
		const supported = await Linking.openURL(link);

		try {
			if (!supported) {
				Alert.alert('Phone number is not available');
			} else {
				return Linking.openURL(link);
			}
		} catch (error) {
		}
	}

	const share = async (item) => {
		const {name} = item;
		try {
			await Share.share({
				message:
					"Bonjour, j'ai découvert cette application qui permet de bien manger et moins cher. Je te la recommande",
			});
		} catch (error) {
		}
	}


	const handleContactPressed = async (item) => {
		const {name, action} = item;
		if (action === 'help') {
			await askHelp(item)
		}

		if (action === 'recommend') {
			await share(item);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				style={styles.listStyle}
				data={MORESCREEN_DATA}
				ListHeaderComponent={ListHeaderComponent}
				renderItem={({item}) => <ListCategoryComponent category={item}
															   onContactPressed={handleContactPressed}/>}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	)
}

export default MoreScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		backgroundColor: colors.warningLight,
	},
	listStyle: {
		marginHorizontal: 5
	},
	sectionTitle: {
		marginTop: 25,
		color: colors.black,
		paddingHorizontal: 5,
		fontSize: 24,
		paddingVertical: 10,
		fontWeight: 'bold',
	}
})
