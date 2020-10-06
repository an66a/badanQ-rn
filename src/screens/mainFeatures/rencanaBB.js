import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Button, Image, SafeAreaView } from 'react-native';

const rencanaBB = (props) => {
    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
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
export default rencanaBB
