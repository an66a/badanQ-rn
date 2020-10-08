import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Image, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { Button, InputDate, InputWithTag } from '../../components/elements/'
import { Icon } from 'react-native-elements';
import { addRecordBB } from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux';



const recordBB = (props) => {
    const dispatch = useDispatch();

    initialState = {
        tanggal: '',
        berat_badan: '',
    }

    const [state, setState] = useState(initialState)
    const set = (e) => {
        setState({ ...state, ...e })
    }

    const user = useSelector(state => state.user.userData)

    const recordData = () => {
        const record = user.data.recordBB
        setState({ ...state, record })
    }

    useEffect(() => {
        recordData()
        return () => {

        }
    }, [user])

    const doSubmit = () => {
        if (state.tangal === '' || state.berat_badan === '') {
            return
        }
        const { tanggal, berat_badan } = state
        dispatch(addRecordBB({ tanggal, berat_badan }), setState({ ...state, ...initialState }))
    }
    // console.log(state.record);



    const renderRow = (props) => {
        console.log(props);
        const item = props.item
        // console.log(item);
        return (
       
                <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1, padding: 10, justifyContent: 'space-between' }}>
                    <View style={styles.flatlistRow}>
                    <Icon
                    name='calendar'
                    type='font-awesome'
                    size={15}
                    color='grey'
                    style={{marginRight: 5}}
                />
                        <Text>{item.tanggal}</Text>
                    </View>
                    <View style={styles.flatlistRow}>
                        <Text >{item.berat_badan}</Text>
                             <Text style={{color: 'grey'}}> Kg </Text>
                             <Icon
                                name='weight'
                                type='font-awesome-5'
                                size={15}
                                color='grey'
                                style={{ marginRight: 0, marginLeft: 3 }}
                            />
                    </View>
                </View>
        )
    }
    return (
        <>
            <SafeAreaView style={styles.container}>

                <View style={styles.box} >
                    <FlatList
                        style={styles.flatlist}
                        data={state.record}
                        renderItem={renderRow}
                        keyExtractor={(item, index) => index.toString()}

                        onEndReachedThreshold={0.1}
                    />
                </View>

                <InputDate set={e => set({ tanggal: e })} value={state.tanggal} mb={20} mt={20} />
                <InputWithTag
                    set={e => set({ berat_badan: e })}
                    value={state.berat_badan}
                    placeholder='Berat Badan'
                    tag='Kg'
                    mb={20}
                    type='numeric'
                    icon={<Icon
                        name='weight'
                        type='font-awesome-5'
                        size={15}
                        color='grey'
                        style={{ marginRight: 5 }}
                    />}
                />
                <Button name='Simpan' onPress={() => doSubmit()} />

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    box: {
        backgroundColor: '#fff',
        padding: 20,
        elevation: 2,
        width: '100%',
        height: '60%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        flex: 0,
        flexDirection: 'row'
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
    },
    inputTanggal: {
        width: '100%',
        alignItems: 'center',
    },
    flatlist: {
        marginTop: 0,
        backgroundColor: '#fff',
        width: '100%'
    },
    flatlistRow: {
     alignItems: 'center', 
     justifyContent: 'center', 
     flexDirection: 'row'
    }
})
export default recordBB
