import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Image, SafeAreaView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, InputSelect } from '../../components/elements/';
import { Avatar, Accessory } from 'react-native-elements';
import { userLogout, deleteAllRecordBB } from '../../actions/userAction'

const profile = (props) => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.userData)
    const [state, set] = useState(userData)
    const { foto, username, nama, email, pekerjaan, tanggallahir, telepon } = state;

    useEffect(() => {

        return () => {

        }
    }, [])
    const doLogOut = () => {
        Alert.alert(
            "Mau kemana " + nama + '?',
            "Yakin mau keluar?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => dispatch(userLogout()) }
            ],
            { cancelable: false }
        );
    }
    
    const doDelete = () => {
        Alert.alert(
            "Hapus Catatan Berat Badan",
            "Apa kamu yakin mau menghapus catatan bertat badan?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => dispatch(deleteAllRecordBB()) }
            ],
            { cancelable: false }
        );
    }
    
    return (
        userData ?
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: 15 }}>
                    <Avatar
                        size="xlarge"
                        rounded
                        source={{
                            uri: foto,
                        }}
                    />
                </View>

                <Input mtop={30} name={'Username'} value={username} alignItems='center' editable={false} />
                <Input name={'Email'} value={email} alignItems='center' editable={false} />

              
                <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 15 }}>
                    <Button name='Hapus Catatan BB' onPress={doDelete} mb={20} />
                    <Button name='Log Out' onPress={doLogOut} />
                </View>


            </SafeAreaView>
            : null
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
export default profile
