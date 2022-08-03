import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {FlatList, RefreshControl, SafeAreaView, StyleSheet, View, Text,TouchableHighlight, Image,Dimensions} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {CATEGORY_ENDPOINT, colors, globalStyles} from '../../utils';
import BottomBar from '../tabs/BottomBar';
import {SecurityContext} from '../../context/SecurityContextProvider';
import {useFocusEffect} from "@react-navigation/native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import CategoryForm from "../form/CategoryForm";



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
    const numberColumns = 2;
    const WIDTH= Dimensions.get('window').width;
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

                                <FlatList style={styles.list}
                                          columnWrapperStyle={{justifyContent: 'space-between'}}
                                          horizontal={false}
                                          numColumns={2}
                                    data={cats}
                                    keyExtractor={(item, index) => `${item.id}-${index}`}
                                    renderItem={({item}) => (
                                        <TouchableHighlight style={styles.item} underlayColor={'#F2785C'} onPress={() => onCategorySelected(item)  }>
                                            <CategoryForm nom={item.name} uri={item.icon}/>
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

    item:{
        width:'50%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    searchResultsContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    categoriesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'right',
        textTransform: 'uppercase',


    },
    cardDisplay: {
        flexDirection: 'row',
        marginBottom:10,
        backgroundColor:'#D3D3D3',
        borderRadius: 20
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




