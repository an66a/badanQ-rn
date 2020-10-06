import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Image, SafeAreaView } from 'react-native';
import Input from '../../components/elements/Input'
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../components/elements/Button'

const recordBB = (props) => {
    initialState = {
        tanggal: '',
        berat: ''
    }
    const [state, setState] = useState(initialState)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    let tgl = date.toISOString()
    let tanggal = tgl.substring(0, 10);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setState({ ...state, tanggal })
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const doSubmit = () => {
        alert('do submit')
    }
    console.log(state);
    return (
        <>
            <SafeAreaView style={styles.container}>

                <View style={styles.box} >
                    <Text>History</Text>
                </View>


                <View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={showDatepicker}
                    style={styles.inputTanggal}
                >
                    <Input placeholder='Input Tanggal' editable={false} value={state.tanggal} mt={20} />
                </TouchableOpacity>

                <Input placeholder='Berat Badan' keyboardType='numeric' value={state.berat} set={(e) => setState({ ...state, berat: e })} />

                <Button name='Simpan' onPress={() => doSubmit()}/>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    box: {
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5,
        // marginTop: 20,
        // margin: 0,
        width: '80%',
        height: '60%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        flex: 0,
        flexDirection: 'row'
    },
    btnTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    menuBtn: {
        width: '50%',
        margin: 5,
        backgroundColor: '#2f4c88',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 0
    },
    inputTanggal: {
        width: '100%',
        alignItems: 'center',
    },
})
export default recordBB
