import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {FlatList, RefreshControl, SafeAreaView, StyleSheet, View, Text,TouchableHighlight, Image} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {CATEGORY_ENDPOINT, colors, globalStyles} from '../../utils';
import BottomBar from '../tabs/BottomBar';
import {SecurityContext} from '../../context/SecurityContextProvider';
import {useFocusEffect} from "@react-navigation/native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';



function AdCategorie() {

    const {state: {creationWizard: {stepIndex, ad}}, updateAd, previousStep} = useContext(ApplicationContext);
    const [category, setCategory] = useState();
    const [error, setError] = useState('');
    const {state, updateCats} = useContext(ApplicationContext);
    const url = `${CATEGORY_ENDPOINT}`;
    const {protectedAxios} = useContext(SecurityContext);
    const {cats} = state;
    const onSubmit = async () => {
        if (category && category !=='undefined') {

            updateAd({infos: {category}})
        } else {
            setError("Veuillez sélectionner une catégorie");
        }
    }

    const searchCategory= async () => {

        try {
            const {data: results = []} = await protectedAxios.get(
                url,

            );
            updateCats(results)

        } catch (e) {
        }
    };
    const onCategorySelected = (categ) => {
        setCategory(categ);
    }


    useFocusEffect(
        React.useCallback(() => {
                    searchCategory();
        },[])
    );

    return (
        <View style={globalStyles.creationContainer}>
            <View style={globalStyles.creationHeader}>
                <Text style={globalStyles.creationTitle}>Choisissez une </Text>
                <Text style={globalStyles.creationTitle}>Catégorie </Text>
            </View>
            <View style={globalStyles.creationBody}>
                <View
                    style={[globalStyles.creationBodyContent]}>
                    <View>

                                <FlatList
                                    contentContainerStyle={styles.searchResultsContainer}
                                    scrollEventThrottle={150}
                                    data={cats}
                                    keyExtractor={(item, index) => `${item.id}-${index}`}
                                    renderItem={({item}) => (
                                        <TouchableHighlight style={styles.item} underlayColor={'#ffffff'} onPress={() => onCategorySelected(item)  }>
                                            <Card style={styles.cardDisplay}   >
                                                <Card.Content>
                                                    <Paragraph style={styles.categoriesContainer}>{item.name}</Paragraph>
                                                </Card.Content>
                                            </Card>
                                        </TouchableHighlight>
                                    )}
                                />
                    </View>
                    {error && !(category && category!=='undefined') ? (
                        <Text style={styles.errorsText}>{error}</Text>) : null}
                </View>
                <BottomBar
                    stepIndex={stepIndex}
                    nextDisabled={!(category && category !=='undefined')}
                    previousStep={previousStep}
                    nextStep={onSubmit}
                />
            </View>
        </View>
    );

}
export default AdCategorie;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'

    },
    searchResultsContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    categoriesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardDisplay: {
        flexDirection: 'column',
        marginBottom:10,
        backgroundColor:'#808080'
    },
    errorsText: {
        color: colors.error,
        borderWidth: 1,
        borderColor: colors.error,
        paddingVertical: 40,
        borderRadius: 5,
        fontSize: 18,
        textAlign: 'center',
        overflow: 'hidden'
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});

