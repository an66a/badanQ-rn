import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Image, SafeAreaView } from 'react-native';
import Button from '../../components/elements/Button'
import Input from '../../components/elements/Input'


const BMI = (props) => {
    initialState = {
        tinggibadan: '',
        beratbadan: '',
        bmi: 'BMI',
    }
    const [state, setState] = useState(initialState)

    const doSubmit = () => {
        alert('do submit')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.textBmi}>{state.bmi}</Text>
            </View>
            <Input placeholder='Tinggi Badan ( sentimeter )' set={(e) => setState({ ...state, tinggibadan: e })} keyboardType='numeric' value={state.tinggibadan} mt={20} />
            <Input placeholder='Berat Badan ( kilogram )' set={(e) => setState({ ...state, beratbadan: e })} keyboardType='numeric' value={state.beratbadan} />

            <Button name='Kalkulasi BMI' onPress={() => doSubmit()} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    box: {
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5,
        margin: 20,
        width: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBmi: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 20,
    },
})
export default BMI
