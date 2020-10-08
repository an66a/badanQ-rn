import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Image, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Button from '../../components/elements/Button'
import Input from '../../components/elements/Input'
import InputWithTag from '../../components/elements/InputWithTag'



const BMI = (props) => {
    initialState = {
        tinggibadan: '',
        beratbadan: '',
        bmi: 'BMI',
    }

    const [state, setState] = useState(initialState)

    const set = (e) => {
        setState({ ...state, ...e })
    }
 
    const doSubmit = () => {
        alert('do submit')
    }
    

    useEffect(() => {

        return () => {

        }
    }, [])
    console.log(state);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.textBmi}>{state.bmi}</Text>
            </View>
            <InputWithTag placeholder='Tinggi Badan' tag='Cm' set={(e) => set({ tinggibadan: e })} value={state.tinggibadan} keyboardType='numeric' icon={<Icon
                    name='human-male-height-variant'
                    type='material-community'
                    size={15}
                    color='grey'
                    style={{marginRight: 5}}
            />} />
            <InputWithTag placeholder='Berat Badan' tag='Kg' set={(e) => set({ beratbadan: e })} value={state.beratbadan} keyboardType='numeric' mt={20} icon={<Icon
                    name='weight'
                    type='font-awesome-5'
                    size={15}
                    color='grey'
                    style={{marginRight: 5}}
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
