import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors} from '../../utils/Styles';
import PictureDisplay from '../Image/PictureDisplay';
import {getDisplayedDate, getFormattedTime} from '../../utils/DateFormat';
import {AntDesign, FontAwesome5} from '@expo/vector-icons';

function MealItem({meal, displayMeal}) {
	return (
		<TouchableHighlight style={styles.item} underlayColor={'transparent'}
							onPress={() => displayMeal(meal.id)}>
			<View style={[styles.itemContainer]}>
				<>
					<View style={styles.imageContainer}>
						<PictureDisplay picture={meal.pictures[0]}/>
					</View>
					<View style={styles.descriptionContainer}>
						<View style={styles.profileData}>
							<Text
								style={styles.profile}>{meal?.profile?.firstName} {meal?.profile?.lastName ? meal?.profile?.lastName[0] : null}.
							</Text>
							<View style={styles.iconLabel}>
								<View style={styles.label}>
									<AntDesign name="eye" size={20} color={colors.black}/>
									<Text>&nbsp;{meal.views ? meal.views : 0}</Text>
								</View>
							</View>
						</View>
						<View style={styles.infos}>
							<Text style={styles.infosName}>{meal.name}</Text>
							<Text style={styles.infosPrice}>{meal.price} €</Text>
						</View>
						{
							meal?.validity?.date ?
								(
									<View style={styles.datesData}>
										<Text
											style={styles.dateItem}>

											<FontAwesome5 name="clock" color={colors.darkgray}
														  size={14}/>
											&nbsp;
											{getDisplayedDate(meal?.validity?.date)}
										</Text>
										<Text
											style={styles.dateItem}>
											{getFormattedTime(new Date(meal?.validity?.start))}
										</Text>
									</View>
								) : null
						}
					</View>
				</>
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({

		descriptionContainer: {
			backgroundColor: colors.white,
			color: colors.white,
			width: "100%",
			paddingVertical: 10,
			paddingHorizontal: 10,
			borderBottomLeftRadius: 10,
			borderBottomRightRadius: 10,
		},
		imageContainer: {
			height: 200,
			backgroundColor: colors.primary
		},
		iconLabel: {
			textAlign: "center",
			alignItems: 'center',
			justifyContent: 'center',
		},
		label: {
			fontSize: 14,
			color: colors.black,
			fontWeight: 'bold',
			textAlign: "center",
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			minWidth: 35,
			paddingHorizontal: 0
		},
		infos: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignContent: "center",
			alignItems: 'center',
			marginVertical: 0
		},
		infosName: {
			fontSize: 20,
			fontWeight: "bold",
			textTransform: 'capitalize',
			color: colors.primary
		},
		infosPrice: {
			fontSize: 20,
			fontWeight: "bold",
			color: colors.warning,
		},
		itemContainer: {
			marginVertical: 5,
			paddingVertical: 0,
			borderRadius: 10,
			overflow: 'hidden',

		},
		profileData: {
			display: "flex",
			width: "100%",
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignContent: "center",
			alignItems: 'center'
		},
		datesData: {
			display: "flex",
			width: "100%",
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignContent: "center",
			alignItems: 'center'
		},
		dateItem: {
			color: colors.darkgray,
			fontSize: 14,
			fontWeight: "normal",
			textTransform: 'capitalize'
		},
		profile: {
			color: colors.black,
			fontSize: 14,
			fontWeight: "bold",
			textTransform: 'capitalize'
		},
		profileInfos: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: "center",
			color: colors.primary,
			fontSize: 20,
			fontWeight: "normal"
		},
		profileInfosText: {
			color: colors.darkgray,
			fontSize: 20,
			marginHorizontal: 10
		}
	})
;
export default MealItem;
