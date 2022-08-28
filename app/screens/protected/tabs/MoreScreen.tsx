import React, { useContext } from 'react';
import {Alert, FlatList, Linking, SafeAreaView, Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ListCategoryComponent from '../../../components/more-screen/ListCategoryComponent';
import ListHeaderComponent from '../../../components/more-screen/ListHeaderComponent';
import { ApplicationContext } from '../../../context/ApplicationContextProvider';
import {colors, HELP_LINK, MORESCREEN_DATA} from '../../../utils';

const MoreScreen = () => {

	const {signOut} = useContext<any>(ApplicationContext);
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
		const {action} = item;
		if (action === 'help') {
			await askHelp(item)
		}

		if (action === 'recommend') {
			await share(item);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
      <View>
			<FlatList
				style={styles.listStyle}
				data={MORESCREEN_DATA}
				ListHeaderComponent={ListHeaderComponent}
				renderItem={({item}) => <ListCategoryComponent category={item}
															   onContactPressed={handleContactPressed}/>}
				keyExtractor={item => item.id}
			/>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => signOut()}>

        <Text
          style={styles.logoutText}>Déconnexion</Text>

      </TouchableOpacity>
      </View>
		</SafeAreaView>
	)
}

export default MoreScreen;

const styles = StyleSheet.create({
  logout: {
    paddingTop: 40,
    marginHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
    color: colors.warning
  },
  logoutText: {
    fontWeight: '600',
    fontSize: 18,
		borderBottomWidth: 1,
    color: colors.warning,
		borderBottomColor: colors.warning,
  },
	container: {
    flex: 1,
    color: colors.warning,
		justifyContent: "space-around",
		backgroundColor: colors.white,
    paddingHorizontal: 15
	},
	listStyle: {
		marginHorizontal: 5,
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
