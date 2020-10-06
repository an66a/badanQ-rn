import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen'
import HomeScreen from './HomeScreen'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { checkUserState } from '../actions/userAction'

const Stack = createStackNavigator();

const MainApp = (props) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.user.isLoading)
    const isLogin = useSelector(state => state.user.isLogin)

    // const isLogin = false //set state login debug
    useEffect(() => {
        dispatch(checkUserState())
    }, [])

    return (
        <>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Stack.Navigator headerMode='none'>
                {isLogin ?
                    (<Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: 'Home' }} />)
                    :
                    (<Stack.Screen name='AuthScreen' component={AuthScreen} options={{ title: 'Auth' }} />)
                    }
            </Stack.Navigator>
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
