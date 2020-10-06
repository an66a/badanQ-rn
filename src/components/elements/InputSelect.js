import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-community/picker';

const InputSelect = (props) => {
    let inputWidth;
    if (props.inputWidth === undefined) { inputWidth = '80%' } //default input width
    
    const styles = StyleSheet.create({
        inputSelect: {
            height: 50,
            width: '100%',
            color: 'grey'
        },
        viewStyle: {
            width: inputWidth,
            backgroundColor: '#fff',
            borderRadius: 25,
            elevation: 5,
            height: 50,
            marginBottom: 20,
            justifyContent: 'center',
            padding: 20,
            marginTop: props.mt
        }
    })
    return (
        <View style={styles.viewStyle} >
            <Picker
                selectedValue={props.selected}
                style={styles.inputSelect}
                onValueChange={props.set}
                >
          {props.item1 ?  <Picker.Item label={props.item1.label} value={props.item1.value} />  : null}    
          {props.item2 ?  <Picker.Item label={props.item2.label} value={props.item2.value} />  : null}    
          {props.item3 ?  <Picker.Item label={props.item3.label} value={props.item3.value} />  : null}    
           
            </Picker>
        </View>
    )
}

export default InputSelect
