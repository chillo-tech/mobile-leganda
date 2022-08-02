import React, {useContext, useState} from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {StyleSheet,Image} from "react-native";
import {IMAGES_URL} from "../../utils";

const CategoryForm = ( {nom, uri})=>{
    return(
        <Card style={styles.cardDisplay}>

                <Paragraph style={styles.Paragraph}>{nom}</Paragraph>

                <Image source={{uri: `${IMAGES_URL}/${uri}` }}   style={{width:100,height:100}}/>

        </Card>
    );
}
export  default  CategoryForm;
const styles = StyleSheet.create({
    cardDisplay: {
        flex:0.3,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        marginBottom:10,
        backgroundColor:'#FCFCFC',
        borderRadius: 10,
        padding :20,
        margin:10,
        borderWidth:10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    Paragraph:{
        textAlign: 'center',
        textDecorationLine: 'none',
        textTransform: 'uppercase',
        textAlignVertical: 'auto',
        fontWeight: 'bold',
        marginBottom:20


    },
    Image:{
        backgroundColor: 'transparent',
        marginTop:30,
        justifyContent:'center',





    }
})
