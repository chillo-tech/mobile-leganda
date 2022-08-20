import React, {useContext, useState} from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {CATEGORY_ENDPOINT, colors, globalStyles} from '../../utils';
import BottomBar from '../tabs/BottomBar';
import {SecurityContext} from '../../context/SecurityContextProvider';
import {useFocusEffect} from "@react-navigation/native";
import CategoryForm from "../form/CategoryForm";



function AdCategorie({navigation}) {

    const {state: {creationWizard: {stepIndex}}, updateAd, previousStep} = useContext(ApplicationContext);
    const [category, setCategory] = useState();
    const [error, setError] = useState('');
    const {state, updateCats} = useContext(ApplicationContext);
    const {protectedAxios} = useContext(SecurityContext);
    const {cats} = state;
    const onSubmit = async () => {
        if (category) {
            updateAd({infos: {category}})
        } else {
            setError("Veuillez sélectionner une catégorie");
        }
    }

    const searchCategory= async () => {
        try {
          const {data: results = []} = await protectedAxios.get(CATEGORY_ENDPOINT);
          updateCats(results);
        } catch (e) {
        }
    };
    const onCategorySelected = (category) => {
        setCategory(category);
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

                                <FlatList style={styles.list}
                                          columnWrapperStyle={{justifyContent: 'space-between'}}
                                          horizontal={false}
                                          numColumns={2}
                                    data={cats}
                                    keyExtractor={(item, index) => `${item.id}-${index}`}
                                    renderItem={({item, index}) => (
                                        <TouchableOpacity activeOpacity={1} style={styles.item}  onPress={() => onCategorySelected(item)  }>
                                            <CategoryForm data={item} selectedCategory={category} index={index}/>
                                        </TouchableOpacity>
                                    )}
                                />
                    </View>
                    {error && !(category && category!=='undefined') ? (
                        <Text style={styles.errorsText}>{error}</Text>) : null}
                </View>
                <BottomBar
                    stepIndex={stepIndex}
                    nextDisabled={!category}
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
        width:'48%',
        marginBottom: 10,
        marginHorizontal: '1%'
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
        textTransform: 'uppercase'
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




