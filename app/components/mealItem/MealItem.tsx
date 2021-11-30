import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/Styles';
import PictureDisplay from '../Image/PictureDisplay';
import {getDisplayedDate} from '../../utils/DateFormat';

function MealItem({meal}) {

	return (
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
							<Text style={styles.label}>4.3</Text>
						</View>
					</View>
					<View style={styles.infos}>
						<Text style={styles.infosName}>{meal.name}</Text>
						<Text style={styles.infosPrice}>{meal.price} €</Text>
					</View>
					{
						meal?.validity?.date ?
							(
								<View style={styles.profileData}>
									<Text
										style={styles.profile}>
										{getDisplayedDate(meal?.validity?.date)}
									</Text>
									<Text
										style={styles.profile}>
										{meal?.validity?.start}
									</Text>
								</View>
							) : null
					}
				</View>

			</>
		</View>

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
			height: 230
		},
		iconLabel: {
			textAlign: "center",
			backgroundColor: "#dddddd",
			borderRadius: 50,
			alignItems: 'center',
			justifyContent: 'center',
			width: 30,
			height: 30,
		},
		label: {
			fontSize: 16,
			color: "#000000",
			textAlign: "center"
		},
		infos: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignContent: "center",
			alignItems: 'center',
			marginVertical: 0
		},
		infosName: {
			fontSize: 25,
			fontWeight: "bold",
			textTransform: 'capitalize',
			color: colors.primary
		},
		infosPrice: {
			fontSize: 25,
			fontWeight: "bold",
			color: colors.warning,
		},
		itemContainer: {
			marginVertical: 5,
			paddingVertical: 0,
			backgroundColor: colors.primary,
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
		profile: {
			color: colors.gray,
			fontSize: 16,
			fontWeight: "normal",
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
			color: colors.gray,
			fontSize: 20,
			marginHorizontal: 10
		}
	})
;
export default MealItem;
