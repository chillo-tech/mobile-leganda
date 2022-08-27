import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ListItem from './ListItem';
import {colors} from '../../utils/Styles';

function ListCategoryComponent({category, onContactPressed}) {
	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{category.title}</Text>
			<FlatList
				style={styles.listStyle}
				data={category.items}
				renderItem={({item}) => <ListItem item={item} onContactPressed={onContactPressed}/>}
				keyExtractor={item => item.id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
  section: {
  },
	container: {
		paddingHorizontal: 10,
		backgroundColor: colors.white
	},
	listStyle: {
		marginHorizontal: 5,
		overflow: 'hidden'
	},
	sectionTitle: {
		textTransform: 'capitalize',
		marginTop: 20,
		marginBottom: 5,
		color: colors.primary,
		paddingHorizontal: 5,
		fontSize: 20,
		paddingVertical: 5,
		fontWeight: 'light',
	}
})

export default ListCategoryComponent;
