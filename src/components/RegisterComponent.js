import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Input from './elements/Input'
import InputSelect from '../components/elements/InputSelect'

const registerComponent = (props) => {
    const stateOne = {
        email: '',
        username: '',
        password: '',
        repassword: '',
    }
    const stateTwo = {
        nama: '',
        jenis_kelamin: '',
    }
    let state = stateOne
    if (props.pageTwo) state = stateTwo
    const setParams = props.nav.setParams;
    const params = props.route.params

    useEffect(() => {
        setParams(state)
    }, [])

    return (
        params ?

            <>

                <SafeAreaView style={styles.container} >
                    {/* LOGO APLIKASI */}
                    <View >
                        <Text style={styles.logo}>BadanQ</Text>
                    </View>

                    {/* FORM REGISTER */}

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
                            <Input placeholder='Nama' set={(e) => setParams({ nama: e })} />
                            <InputSelect
                                selected={params.jenis_kelamin}
                                set={(itemValue, itemIndex) =>
                                    setParams({ jenis_kelamin: itemValue })}
                                item1={{ label: 'Pilih Jenis Kelamin ...', value: '' }}
                                item2={{ label: 'Laki-laki', value: 'laki-laki' }}
                                item3={{ label: 'Perempuan', value: 'perempuan' }}
                            />
                        </>
                        : null}

                </SafeAreaView>

            </>

            : null
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444444',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#fff',
        marginBottom: 50
    },
})

export default registerComponent
