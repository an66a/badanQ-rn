import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Image, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Button from '../../components/elements/Button'

import InputWithTag from '../../components/elements/InputWithTag'

const BMI = (props) => {
    initialState = {
        tinggibadan: '',
        beratbadan: '',
        bmi: '',
    }

    const [state, setState] = useState(initialState)

    const set = (e) => {
        setState({ ...state, ...e })
    }

    const doSubmit = () => {
        const tinggiMeter = state.tinggibadan / 100;
        const berat = state.beratbadan;
        const tinggi = Math.pow(tinggiMeter, 2)
        const total = berat / tinggi
        const round = (value, precision) => {
            let multiplier = Math.pow(10, precision || 0);
            return Math.round(value * multiplier) / multiplier;
        }
        const bmi = round(total, 2)
        setState({ ...initialState, bmi })
    }

    useEffect(() => {

        return () => {

        }
    }, [])

    let bmiData;
    if (state.bmi < 17) {
        bmiData = 'Kurus, kekurangan berat badan berat'
    } else if (state.bmi >= 17 && state.bmi <= 18.4) {
        bmiData = 'Kurus, kekurangan berat badan ringan'
    } else if (state.bmi >= 18.5 && state.bmi <= 25.0) {
        bmiData = 'Normal'
    } else if (state.bmi >= 25.1 && state.bmi <= 27.0) {
        bmiData = 'Gemuk, kelebihan berat badan tingkat ringan'
    } else if (state.bmi > 27){
        bmiData = 'Gemuk, kelebihan berat badan tingkat berat'
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                {state.bmi ?
                    <>
                        <Text style={styles.textBmi}>BMI Kamu {state.bmi}</Text>
                        <Text style={styles.textBmi}>{bmiData}</Text>
                    </>
                    : <Text style={styles.textBmi}>Cek BMI Kamu Disini</Text>
                }
            </View>
            <InputWithTag placeholder='Tinggi Badan' tag='Cm' set={(e) => set({ tinggibadan: e })} value={state.tinggibadan} type='numeric' icon={<Icon
                name='human-male-height-variant'
                type='material-community'
                size={15}
                color='grey'
                style={{ marginRight: 5 }}
            />} />
            <InputWithTag placeholder='Berat Badan' tag='Kg' set={(e) => set({ beratbadan: e })} value={state.beratbadan} type='numeric' mt={20} icon={<Icon
                name='weight'
                type='font-awesome-5'
                size={15}
                color='grey'
                style={{ marginRight: 5 }}
            />}
            />
            <Button name='Kalkulasi BMI' onPress={() => doSubmit()} mt={20} />
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
        elevation: 3,
        margin: 20,
        width: '80%',
        height: '30%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBmi: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Quicksand',
    },
})
export default BMI
