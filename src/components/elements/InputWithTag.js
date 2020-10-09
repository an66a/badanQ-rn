import React from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native';

const InputWithTag = (props) => {
    let mt = 0
    let mb = 0
    if (props.mt) mt = props.mt
    if (props.mb) mb = props.mb
    const styles = StyleSheet.create({
        viewStyle: {
            borderRadius: 25,
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            elevation: 2,
            height: 50,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: mt,
            marginBottom: mb
        },
        input: {
            flex: 1,
            height: 50,
            fontFamily: 'Quicksand'
        },
        textTag:{
            color: 'grey',
            fontFamily: 'Quicksand',
        }
    })
    return (
        <View style={styles.viewStyle}>
            <TextInput
                style={styles.input}
                editable={props.editable}
                textAlign={props.textAlign}
                autoCompleteType={props.autoComplete}
                keyboardType={props.type}
                value={props.value}
                secureTextEntry={props.scr}
                placeholder={props.placeholder}
                onChangeText={(el) => props.set(el)}
            />
             {props.icon ?
                props.icon
                : null}
            {props.tag ?
                <Text style={styles.textTag}>{props.tag}</Text>
                : null}

           
        </View>
    )
}

export default InputWithTag
