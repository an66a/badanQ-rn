import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, Image, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, Input, InputSelect } from '../../components/elements'


const Tabs = createMaterialTopTabNavigator();


const createContent = (props) => {
    const [state, setState] = useState({
        title: '',
        img: '',
        content: ''
    })

    return (
        <SafeAreaView style={styles.container}>
            <Input  placeholder='Title' set={(e) => setState({ ...state, title: e })} />
            <Input  placeholder='Isi konten...' set={(e) => setState({ ...state, content: e })} height={500}/>
        </SafeAreaView>
    )
}
const listContent = (props) => {
    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    )
}


const contentScreen = (props) => {
    return (
        <Tabs.Navigator tabBarPosition='bottom' initialRouteName="listContent"
            backBehavior={'initialRoute'}
            swipeEnabled={true}
            tabBarOptions={{
                labelStyle: { fontSize: 12, color: 'white' },
                style: { backgroundColor: '#2f4c88' },
            }}
        >
            <Tabs.Screen name='listContent' component={listContent} options={{ title: 'Daftar Konten' }} />
            <Tabs.Screen name='createContent' component={createContent} options={{ title: 'Buat Konten' }} />

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

export default contentScreen
