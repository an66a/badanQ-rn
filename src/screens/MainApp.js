import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import AuthScreen from '../screens/AuthScreen'
import HomeScreen from './HomeScreen'
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';


const MainApp = () => {
    const isLoading = useSelector(state => state.user.isLoading)
    // const isLogin = useSelector(state => state.user.isLogin)

    const isLogin = true //set state login debug
    
    return (
        <>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            {isLogin ? (
                <HomeScreen />
            )
                : (
                    <AuthScreen />
                )}

        </>
    )
}
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
export default MainApp
