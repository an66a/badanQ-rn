import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import Input from '../../components/elements/Input'
import { userLogin } from '../../actions/userAction'

const login = (props) => {
    initialState = {
        username: '',
        password: '',
    }
    
    const [state, set] = useState(initialState);
    const { username, password } = state;
    const dispatch = useDispatch();

    const doSign = () => {
        if (username === '' || password === '') {
            alert("Please fill out all fields.")
            return
        }
        dispatch(userLogin(username, password), set(initialState));
    }

    return (
        <SafeAreaView style={styles.container} >
            {/* LOGO APLIKASI */}

            <View >
                <Text style={styles.logo}>BadanQ</Text>
            </View>

            <Input placeholder='Username' value={username} set={(e) => set({ ...state, username: e })} />
            <Input placeholder='Password' value={password} set={(e) => set({ ...state, password: e })} scr={props.hidepass} />

            <TouchableOpacity style={styles.inputBtn} onPress={() => doSign()}>
                <Text style={styles.btnTitle}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputBtn2} onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.btnTitle2}>REGISTER</Text>
            </TouchableOpacity>

        </SafeAreaView>
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
    btnTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    btnTitle2: {
        color: '#00a2ff',
        fontWeight: 'bold',
    },
    inputBtn: {
        width: '80%',
        backgroundColor: '#00a2ff',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 0
    },
    inputBtn2: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 0
    }
})
export default login

