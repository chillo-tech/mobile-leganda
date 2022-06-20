import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import {colors} from '../../utils/Styles';
import {AntDesign} from '@expo/vector-icons';

const PicturePicker = React.forwardRef(({onItemSelected}, ref) => {
	const imageOptions = [
		{
			"id": 1,
			"label": "Galerie",
			"icon": "picture",
			"value": "PICTURE",
			"color": colors.primary
		},
		{
			"id": 2,
			"label": "Camera",
			"icon": "camera",
			"value": "CAMERA",
			"color": colors.primary
		}
	]
	return (
		<View>
			<RBSheet
				ref={ref}
				closeOnDragDown={true}
				closeOnPressMask={true}
				animationType={'slide'}
				height={100}
				customStyles={{
					wrapper: {
						backgroundColor: "rgba(0,0,0, 0.7)"
					},
					draggableIcon: {
						backgroundColor: colors.primary
					}
				}}
			>
				<View style={styles.container}>
					{imageOptions.map(({icon, label, color, value, index}) => (
						<TouchableHighlight key={`item-${label}`}
											style={styles.item}
											underlayColor={'transparent'}
											onPress={() => onItemSelected(value)}>
							<>
								<View style={styles.iconWrapper}>
									<AntDesign name={icon} size={24} color={color}/>
								</View>
								<Text
									style={[styles.buttonText]}>
									{label}
								</Text>
							</>
						</TouchableHighlight>
					))}
				</View>
			</RBSheet>
		</View>
	);
})
const styles = StyleSheet.create({
	buttonText: {
		color: colors.primary
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignContent: 'center'
	},
	iconWrapper: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: colors.lightgray,
		alignItems: 'center',
		justifyContent: 'center'
	},
	item: {
		flexGrow: 1,
		flexBasis: 0,
		alignContent: 'center',
		alignItems: 'center'
	},
})
export default PicturePicker;
