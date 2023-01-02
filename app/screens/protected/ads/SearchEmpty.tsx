import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/Styles';
import Message from '../../../components/messages/Message';
import { SafeAreaView } from 'react-native-safe-area-context';

function SearchEmpty() {
	return (
		<SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
			<Message
				firstText="Désolé, aucune publication ne correspond à vos critères de recherche."
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: 5,
		overflow: 'hidden',
		padding: 10,
	},
});
export default SearchEmpty;
