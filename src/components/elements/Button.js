import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
    let bgColor = '#2f4c88';
    let fontColor = '#fff';
    let br = 10;
    if (props.white) {
        bgColor = '#fff'
        fontColor = '#2f4c88'
    }
    const styles = StyleSheet.create({
        btnTitle: {
            color: fontColor,
            fontWeight: 'bold',
        },
        inputBtn: {
            width: '80%',
            backgroundColor: bgColor,
            borderRadius: br,
            elevation: 5,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: props.mt,
            marginBottom: props.mb
        },
    })
    return (
        <TouchableOpacity style={styles.inputBtn} activeOpacity={0.7} onPress={() => props.onPress()}>
            <Text style={styles.btnTitle}>{props.name}</Text>
        </TouchableOpacity>
    )
}


export default Button
