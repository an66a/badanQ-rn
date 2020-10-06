import React from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native';

const Input = (props) => {
    // console.log(props);
    let height = 50;
    let inputWidth = '80%';
    let align = 'center';
    let line = false;

    if (props.height) {
        height = props.height;
        align = 'top';
        line = true;
    }
    
    if (props.inputWidth) inputWidth = props.inputWidth

    const styles = StyleSheet.create({
        inputText: {
            height: height,
            color: 'grey',
            fontSize: 15,
            textAlignVertical: align,
        },
        viewStyle: {
            width: inputWidth,
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 25,
            height: height,
            marginBottom: 20,
            justifyContent: 'center',
            // alignItems: 'center',
            padding: 20,
            marginTop: props.mt
        }
    })
    return (
        <>
            {props.name ?
                <Text style={{ marginBottom: 5, fontSize: 20, fontWeight: 'bold', color: 'grey', alignItems: 'center' }}>{props.name}</Text>
                : null}

            <View style={styles.viewStyle} >

                <TextInput
                    editable={props.editable}
                    textAlign={props.textAlign}
                    autoCompleteType={props.autoComplete}
                    multiline={line}
                    keyboardType={props.keyboardType}
                    style={styles.inputText}
                    value={props.value}
                    secureTextEntry={props.scr}
                    placeholder={props.placeholder}
                    onChangeText={(el) => props.set(el)}
                />

            </View>
        </>
    )
}

export default Input