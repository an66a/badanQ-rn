import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import Input from './elements/Input'
import InputSelect from '../components/elements/InputSelect'
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';

const registerComponent = (props) => {
    const stateOne = {
        email: '',
        username: '',
        password: '',
        repassword: '',
    }
    const stateTwo = {
        nama: '',
        jeniskelamin: '',
        tanggallahir: '',
        telepon: '',
    }
    const stateThree = {
        alasan: '',
        pekerjaan: '',
        fotopath: '',
    }
    let state = stateOne

    const setParams = props.nav.setParams;
    const params = props.route.params

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [photoBtn, setPhoto] = useState('Upload Foto')

    let tgl = date.toISOString()
    let tanggallahir = tgl.substring(0, 10);
 
    useEffect(() => {
        if (props.pageTwo) state = stateTwo
        if (props.pageThree) state = stateThree
        setParams(state)

    }, [])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setParams({ tanggallahir })
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const getPhotoPath = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log(response);
            setParams({ fotopath: response.path, fotoname: response.fileName })
            setPhoto(response.fileName)
        });
    }
    // console.log(params);
    return (
        (params ?
            <>
                <SafeAreaView style={styles.container} >
                    {/* FORM REGISTER */}
                    {/* <View >
                        <Image
                            style={styles.logo}
                            source={require('../img/logo.png')}
                        />
                    </View> */}
                    {props.pageOne ?
                        <>
                            <Input placeholder='Email' value={params.email} autoComplete='off' keyboardType='email-address' set={(e) => setParams({ email: e })} />
                            <Input placeholder='Username' value={params.username} set={(e) => setParams({ username: e })} />
                            <Input placeholder='Password' value={params.password} set={(e) => setParams({ password: e })} scr={props.hidepass} />
                            <Input placeholder='Retype Password' value={params.repassword} set={(e) => setParams({ repassword: e })} scr={props.hidepass} />
                        </>
                        : null}

                    {props.pageTwo ?
                        <> 
                            <Input placeholder='Nama' value={params.nama} set={(e) => setParams({ nama: e })} />

                            <View>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={showDatepicker}
                                style={styles.inputBtn}
                            >
                                <Input placeholder='Tanggal Lahir' editable={false} value={params.tanggallahir} />
                            </TouchableOpacity>
                            
                            <InputSelect
                                selected={params.jeniskelamin}
                                set={(itemValue, itemIndex) =>
                                    setParams({ jeniskelamin: itemValue })}
                                item1={{ label: 'Jenis Kelamin ...', value: '' }}
                                item2={{ label: 'Laki-laki', value: 'laki-laki' }}
                                item3={{ label: 'Perempuan', value: 'perempuan' }}
                            />
                            <Input placeholder='No. Telepon / Ponsel' value={params.telepon} set={(e) => setParams({ telepon: e })} />
                        </>
                        : null}
                        
                    {props.pageThree ?
                        <>
                            <Input placeholder='Alasan Bergabung' value={params.alasan} set={(e) => setParams({ alasan: e })} />
                            <Input placeholder='Pekerjaan' value={params.pekerjaan} set={(e) => setParams({ pekerjaan: e })} />

                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => getPhotoPath()}
                                style={styles.inputBtn2}
                            >
                                <Text style={styles.btnTitle2}>{photoBtn}</Text>
                            </TouchableOpacity>
                        </>
                        : null}
                </SafeAreaView>
            </>
            : null)
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 50
    },
    btnTitle2: {
        color: 'grey',
        fontWeight: 'bold',
    },
    inputBtn: {
        width: '100%',
        alignItems: 'center',
    },
    inputBtn2: {
        width: '80%',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 0
    },
})

export default registerComponent
