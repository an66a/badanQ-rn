import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './auth/login'
import RegisterScreen from './auth/register'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator(); //pake stack navigation kdg gak jalan pas debug 
const AuthScreen = (props) => {
    // console.log('auth',props);
    return (
        <>
            <Drawer.Navigator headerMode='none'>
                <Drawer.Screen name='Login' component={LoginScreen} options={{ swipeEnabled: false }} />
                <Drawer.Screen name='Register' component={RegisterScreen} options={{ swipeEnabled: false }} />
            </Drawer.Navigator>
        </>
    )
}
export default AuthScreen