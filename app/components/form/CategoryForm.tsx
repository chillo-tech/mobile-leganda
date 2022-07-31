import React, {useContext, useState} from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {StyleSheet} from "react-native";

const CategoryForm = ( {nom, uri})=>{
    return(
        <Card style={styles.cardDisplay}>
            <Card.Content>
                <Avatar.Image  style={styles.Image} source={{uri: uri }}/>
                <Paragraph style={styles.Paragraph}>{nom}</Paragraph>
            </Card.Content>
        </Card>
    );
}
export  default  CategoryForm;
const styles = StyleSheet.create({
    cardDisplay: {
        flexDirection: 'row',
        marginBottom:10,
        backgroundColor:'#D3D3D3',
        borderRadius: 20
    },
    Paragraph:{
        textAlign: 'right',
        textDecorationLine: 'underline',
        textTransform: 'uppercase',
        textAlignVertical: 'auto',
        fontWeight: 'bold',
        fontStyle:'italic'

    },
    Image:{
        backgroundColor: 'transparent',


    }
})
