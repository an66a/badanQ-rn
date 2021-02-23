import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Input from './elements/Input'
import { InputDate, InputSelect } from '../components/elements/'
import ImagePicker from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { Button } from '../components/elements/'


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

    const isRegistered = useSelector(state => state.user.isRegistered)

    const setParams = props.nav.setParams;
    const params = props.route.params

    const [photoBtn, setPhoto] = useState('Upload Foto')

    useEffect(() => {
        if (props.pageTwo) state = stateTwo
        if (props.pageThree) state = stateThree
        setParams(state)
        return () => {
            setParams(state)

        }
    }, [isRegistered])

    const getPhotoPath = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            setParams({ fotopath: response.path, fotoname: response.fileName })
            if (response.fileName) {
                setPhoto(response.fileName)
            }
        });
    }

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
                            <InputDate title='Tanggal Lahir' value={params.tanggallahir} mb={20} set={e => setParams({ tanggallahir: e })} />

                            <InputSelect
                                selected={params.jeniskelamin}
                                set={(itemValue, itemIndex) =>
                                    setParams({ jeniskelamin: itemValue })}
                                item1={{ label: 'Jenis Kelamin ...', value: '' }}
                                item2={{ label: 'Laki-laki', value: 'laki-laki' }}
                                item3={{ label: 'Perempuan', value: 'perempuan' }}
                            />
                            <Input placeholder='No. Telepon / Ponsel' value={params.telepon} keyboardType='numeric' set={(e) => setParams({ telepon: e })} />
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

                            {isRegistered ?
                                <View style={{ marginTop: 20, width: '100%', alignItems: 'center', position: 'absolute', bottom: 20 }}>
                                    <Text style={{ marginBottom: 10, fontWeight: 'bold', color: 'grey' }}>Pendaftaran Berhasil</Text>
                                    <Button name='Ke Halaman Login' onPress={() => props.nav.reset({
                                        index: 0,
                                        routes: [{ name: 'Login' }],
                                    })} white />
                                </View>
                                : null}
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
        elevation: 3,
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 0
    },
})

export default registerComponent
