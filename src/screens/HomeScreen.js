import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import MainHome from './home/MainHome';
import { BMI, rencanaBB, recordBB, ukurKalori } from './mainFeatures'
import { contentScreen, programScreen } from './instructorFeatures'
import Profile from './profile/profile'
import { View, TouchableOpacity } from 'react-native';
// import {  } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const HomeScreen = (props) => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerLeftContainerStyle: { paddingLeft: 10 },
            headerRightContainerStyle: { paddingRight: 15 },
            headerStyle: { backgroundColor: '#2f4c88' },
            headerTitleStyle: { color: 'white' },

        }}>
            <Stack.Screen name={'Home'} component={MainHome}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{marginLeft: 10}}   onPress={() => props.navigation.navigate('Profile')}>
                        <Icon
                            name='user-circle'
                            type='font-awesome'
                            color='#fff'
                            size={25}            
                        />
                        </TouchableOpacity>
                    ),
                    // headerRight: () => (menu ? rightHeadBar : null)
                    title: 'BadanQ',
                    // headerTransparent: true,
                }}
            />
            <Stack.Screen name='BMI' component={BMI} options={{ title: 'BMI' }} />
            <Stack.Screen name='ukurKalori' component={ukurKalori} options={{ title: 'Ukur Kalori' }} />
            <Stack.Screen name='rencanaBB' component={rencanaBB} options={{ title: 'Rencana BB' }} />
            <Stack.Screen name='recordBB' component={recordBB} options={{ title: 'Record BB' }} />
            <Stack.Screen name='contentScreen' component={contentScreen} options={{ title: 'Konten' }} />
            <Stack.Screen name='programScreen' component={programScreen} options={{ title: 'Program' }} />
            <Stack.Screen name='Profile' component={Profile} options={{ title: 'Profil Akun' }} />
        </Stack.Navigator>

    )
}

export default HomeScreen
