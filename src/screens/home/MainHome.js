import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

const MainHome = (props) => {
    // const isInstructor = useSelector(state => state.user.isInstructor)
    const [isInstructor, setstate] = useState(true) // debug

    const navTo = props.navigation.navigate;
    return (
        <SafeAreaView style={styles.container}>

            {/* MAIN MENU */}
            <View style={styles.box}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7} onPress={() => navTo('BMI')}>
                        <Text style={styles.btnTitle}>BMI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7} onPress={() => navTo('ukurKalori')}>
                        <Text style={styles.btnTitle} >Ukur Kalori</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7} onPress={() => navTo('rencanaBB')}>
                        <Text style={styles.btnTitle}>Rencana BB</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7} onPress={() => navTo('recordBB')}>
                        <Text style={styles.btnTitle} >Record BB</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {isInstructor ?

                <View style={styles.box}>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7} onPress={() => navTo('contentScreen')}>
                            <Text style={styles.btnTitle}>Konten</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7} onPress={() => navTo('programScreen')}>
                            <Text style={styles.btnTitle} >Program</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : null}

        </SafeAreaView >

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    box: {
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5,
        marginTop: 20,
        width: '90%',
        // height: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        flex: 0,
        flexDirection: 'row',
    },
    btnTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    menuBtn: {
        width: '50%',
        margin: 5,
        backgroundColor: '#2f4c88',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 0
    }
})
export default MainHome
