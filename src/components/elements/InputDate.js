import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Image, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';

const InputDate = (props) => {
    let dateValue = 'Input Tanggal'
    let mt = 0
    let mb = 0
    if (props.mt) mt = props.mt
    if (props.mb) mb = props.mb
    if (props.title) dateValue = props.title
    if (props.value) dateValue = props.value
    const styles = StyleSheet.create({
        viewStyle: {
            borderRadius: 25,
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            elevation: 2,
            height: 50,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: mt,
            marginBottom: mb
        },
        icon: {
            padding: 10,
        },
        btnTitle: {
            color: 'grey',
            marginLeft: 5,
            fontFamily: 'Quicksand',
            // fontWeight: 'bold',
        },
    })
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tgl = currentDate.toISOString()
        let tanggal = tgl.substring(0, 10);
        props.set(tanggal)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <>
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
                style={styles.viewStyle}
            >
                <Text style={styles.btnTitle}>{dateValue}</Text>
                <Icon
                    name='calendar'
                    type='font-awesome'
                    size={15}
                    color='grey'
                    style={styles.icon}
                />
            </TouchableOpacity>

        </>
    )
}
export default InputDate
