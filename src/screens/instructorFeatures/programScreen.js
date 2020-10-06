import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Button, Image, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tabs = createMaterialTopTabNavigator();


const createProgram = (props) => {
    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    )
}
const listProgram = (props) => {
    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    )
}


const programScreen = (props) => {
    return (
        <Tabs.Navigator tabBarPosition='bottom' initialRouteName="listProgram" 
        backBehavior={'initialRoute'} 
        swipeEnabled={true}
        tabBarOptions={{
            labelStyle: { fontSize: 12, color: 'white' },
            style: { backgroundColor: '#2f4c88' },
          }}
        >
            <Tabs.Screen name='listProgram' component={listProgram} options={{ title: 'Daftar Program' }} />
            <Tabs.Screen name='createProgram' component={createProgram} options={{ title: 'Buat Program' }} />

        </Tabs.Navigator>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    box: {
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5,
        width: '80%',
        // height: '60%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        flex: 0,
        flexDirection: 'row'
    },

})

export default programScreen
