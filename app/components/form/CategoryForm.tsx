import React from 'react';
import { Card, Text } from 'react-native-paper';
import {StyleSheet,Image} from "react-native";
import {IMAGES_URL, CATEGORY_BGCOLORS, colors} from "../../utils";
import {AntDesign} from '@expo/vector-icons';
const CategoryForm = ( {data, selectedCategory, index}) => {
    return(
        <Card style={
            [ styles.wrapper, 
              { backgroundColor: CATEGORY_BGCOLORS[index]},
              selectedCategory && selectedCategory.id === data.id ? styles.selectedCard : null
            ]
          }>
            {selectedCategory && selectedCategory.id === data.id ? <AntDesign style={styles.icon} name="checkcircle" size={20} color={colors.warning}/> : null}
            <Text style={styles.title}>{data.name}</Text>
            <Image source={{uri: `${IMAGES_URL}/${data.icon}` }} style={{width:80, height:80}}/>
        </Card>
    );
}
export  default  CategoryForm;
const styles = StyleSheet.create({
    selectedCard: {
      borderWidth: 3,
      borderColor: colors.warning
    },
    icon: {
      position: 'absolute',
      right: -40,
      top: -10,
    },
    wrapper: {
        borderRadius: 10,
        padding: 20,
        elevation: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        textAlign: 'center',
        textDecorationLine: 'none',
        textTransform: 'capitalize',
        textAlignVertical: 'auto',
        fontWeight: '700',
        marginBottom:20,
        color: "#ffffff",
    },
    image:{
        backgroundColor: 'transparent',
        marginTop:30,
        justifyContent:'center'
    }
})
