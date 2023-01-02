import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity, View} from 'react-native';
import {colors, globalStyles} from '../../utils';
import React from 'react';
import {ICON, LABELS} from '../../utils/Labels';
import {Feather} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function BottomTab({state, descriptors, navigation}) {
	return (
		<View style={{flexDirection: 'row', backgroundColor: colors.white}}>
			{state.routes.map((route, index) => {
				const {options} = descriptors[route.key];
				const isFocused = state.index === index;
				const onPress = (name) => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						if (name === 'NewAd') {
							//navigation.navigate({name: 'Signin', merge: true});
							navigation.navigate({name: 'ad-update', merge: true});
						} else {
							navigation.navigate({name: route.name, merge: true});
						}
					}
				};

				const onLongPress = (name) => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};
				return (
					<TouchableOpacity key={`button${index}`}
									  activeOpacity={1}
									  accessibilityRole="button"
									  accessibilityState={isFocused ? {selected: true} : {}}
									  accessibilityLabel={options.tabBarAccessibilityLabel}
									  testID={options.tabBarTestID}
									  onPress={() => onPress(route.name)}
									  onLongPress={() => onLongPress(route.name)}
									  style={{
										  flex: 1,
										  paddingTop: 5,
										  alignItems: 'center'
									  }}
					>
						<Feather name={ICON[route.name]} size={24} color={isFocused ? colors.warning : colors.primary}/>
						<Text style={{color: isFocused ? colors.warning : colors.primary}}>
							{LABELS[route.name]}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

export default BottomTab;
