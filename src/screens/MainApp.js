import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AuthScreen from '../screens/AuthScreen'


export default class MainApp extends Component {
    render() {
        return (
            <NavigationContainer>
                {this.props.isLogin ? (
                    <AuthScreen /> // Ganti Home App
                )
                    : (

                        <AuthScreen />

                    )}
            </NavigationContainer>
        )
    }
}
