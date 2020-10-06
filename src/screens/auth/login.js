import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import Input from '../../components/elements/Input'
import { userLogin, isLoading } from '../../actions/userAction'
import { checkUserData } from '../../actions/actionHelper'

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
 const test = ()=>{
     dispatch(checkUserData())
 }
    return (
        <SafeAreaView style={styles.container} >
         
            <View >
                <Image
                    style={styles.logo}
                    source={require('../../img/logo.png')}
                />
            </View>

            <Input placeholder='Username' value={username} set={(e) => set({ ...state, username: e })} />
            <Input placeholder='Password' value={password} set={(e) => set({ ...state, password: e })} scr />

            <TouchableOpacity style={styles.inputBtn} activeOpacity={0.7} onPress={() => doSign()}>
                <Text style={styles.btnTitle}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputBtn2} activeOpacity={0.7}  onPress={() => props.navigation.navigate('Register')}>
           
                <Text style={styles.btnTitle2}>REGISTER</Text>
            </TouchableOpacity>

        </SafeAreaView>
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
    btnTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    btnTitle2: {
        color: '#2f4c88',
        fontWeight: 'bold',
    },
    inputBtn: {
        width: '80%',
        backgroundColor: '#2f4c88',
        borderRadius: 10,
        elevation: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 0
    },
    inputBtn2: {
        width: '80%',
        backgroundColor: '#a2b3ce',
        borderRadius: 10,
        elevation: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 0
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },

})
export default login

