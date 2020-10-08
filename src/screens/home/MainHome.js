import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from '../../actions/userAction'



const MainHome = (props) => {
    const dispatch = useDispatch()
    const isInstructor = useSelector(state => state.user.isInstructor)
    const navTo = props.navigation.navigate;
    // const [isInstructor, setstate] = useState(true) // debug
    const [isDebug, setDebug] = useState(true)
    const debug1 = 'check user'
    const debug2 = 'debug2'
    const debug3 = 'debug3'

    const doDebug1 = () => {
        dispatch(checkUser())
    }
    const doDebug2 = () => {
        
    }
    return (
        <SafeAreaView style={styles.container}>

            {/* MAIN MENU */}
            <View style={styles.box}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuBtn} activeOpacity={0.4} onPress={() => navTo('BMI')}>
                        <Icon
                            name='scale-bathroom'
                            type='material-community'
                            size={25}
                            style={styles.icon}
                        />
                        <Text style={styles.btnTitle}>BMI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuBtn} activeOpacity={0.4} onPress={() => navTo('ukurKalori')}>
                        <Icon
                            name='scale'
                            type='material-community'
                            size={25}
                            style={styles.icon}
                        />
                        <Text style={styles.btnTitle} >Ukur Kalori</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuBtn} activeOpacity={0.4} onPress={() => navTo('recordBB')}>
                        <Icon
                            name='calendar-edit'
                            type='material-community'
                            size={25}
                            style={styles.icon}
                        />
                        <Text style={styles.btnTitle} >Record BB</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuBtn} activeOpacity={0.4} onPress={() => navTo('rencanaBB')}>
                        <Icon
                            name='file-document-edit-outline'
                            type='material-community'
                            size={25}
                            style={styles.icon}
                        />
                        <Text style={styles.btnTitle}>Rencana BB</Text>
                    </TouchableOpacity>

                </View>
            </View>

            {isInstructor ?
                <View style={styles.box}>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.4} onPress={() => navTo('contentScreen')}>
                            <Icon
                                name='table-of-contents'
                                type='material-community'
                                size={25}
                                style={styles.icon}
                            />
                            <Text style={styles.btnTitle}>Konten</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.4} onPress={() => navTo('programScreen')}>
                            <Icon
                                name='profile'
                                type='ant-design'
                                size={25}
                                style={styles.icon}
                            />
                            <Text style={styles.btnTitle} >Program</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.4} onPress={() => alert('to memberlist')}>
                            <Icon
                                name='users'
                                type='font-awesome'
                                size={25}
                                style={styles.icon}
                            />
                            <Text style={styles.btnTitle} >Member</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : null}


            {isDebug ?

                <View style={styles.box} >
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.4} onPress={() => doDebug1()}>
                            <Icon
                                name='console'
                                type='material-community'
                                size={25}
                                style={styles.icon}
                            />
                            <Text style={styles.btnTitle}>{debug1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.4} onPress={() => doDebug2()}>
                            <Icon
                                name='console'
                                type='material-community'
                                size={25}
                                style={styles.icon}
                            />
                            <Text style={styles.btnTitle} >{debug2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.4} onPress={() => doDebug3()}>
                            <Icon
                                name='console'
                                type='material-community'
                                size={25}
                                style={styles.icon}
                            />
                            <Text style={styles.btnTitle} >{debug3}</Text>
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
        padding: 0,
        elevation: 2,
        marginTop: 20,
        width: '90%',
        // height: '20%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        flex: 0,
        flexDirection: 'row',
    },
    btnTitle: {
        color: '#444444',
        fontWeight: 'bold',
    },
    menuBtn: {
        flex: 1,
        // flexDirection: 'column',
        // width: '50%',
        margin: 15,
        // backgroundColor: '#2f4c88',
        // elevation: 5,
        // borderRadius: 5,
        // height: 70,
        alignItems: 'center',
        // justifyContent: 'center',
        // marginBottom: 0
    },
    icon: {
        marginBottom: 7,
    }
})
export default MainHome
