import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Image, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { Button, InputDate, InputWithTag } from '../../components/elements/'
import { Icon, Overlay } from 'react-native-elements';
import { addRecordBB, deleteRecordBB } from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux';

const recordBB = ({ navigation }) => {
    const dispatch = useDispatch();
    // console.log(props);
    const [date, setDate] = useState(new Date());
    let tgl = date.toISOString()
    let tanggal = tgl.substring(0, 10);

    initialState = {
        tanggal: tanggal,
        berat_badan: '',
    }

    const [state, setState] = useState(initialState)

    const [inputRecord, showInput] = useState(false)

    const set = (e) => {
        setState({ ...state, ...e })
    }

    const user = useSelector(state => state.user.userData)

    const recordData = () => {
        const record = user.data.recordBB
        setState({ ...state, record })
    }

    // console.log(state);

    useEffect(() => {
        if (user) {
            recordData()
        }
        // setState({...state, tanggal})
        return () => {

        }
    }, [user, inputRecord])

    const doSubmit = () => {
        if (state.tangal === '' || state.berat_badan === '') {
            return
        }
        const { tanggal, berat_badan } = state
        dispatch(addRecordBB({ tanggal, berat_badan }), setState({ ...state, ...initialState }))
    }

    const _show = () => {
        return (
            <TouchableOpacity style={{ marginRight: 5 }} onPress={() => showInput(true)}>
                <Icon
                    name='pencil-plus'
                    type='material-community'
                    color='#fff'
                    size={25}
                />
            </TouchableOpacity>
        )
    }

    const _hide = () => {
        return (
            <TouchableOpacity style={{ marginRight: 5 }} onPress={() => showInput(false)}>
                <Icon
                    name='pencil-remove'
                    type='material-community'
                    color='#fff'
                    size={25}
                />
            </TouchableOpacity>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                inputRecord ? <_hide />
                    : <_show />
            ),
        });
    }, [inputRecord]);


    const doDelete = () => {
        const { item } = state
        dispatch(deleteRecordBB(item), setVisible(false))
    }

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    // console.log(state);
    const renderRow = (props) => {
        const item = props.item
        // console.log(props);
        return (
            <TouchableOpacity onPress={() => setState({ ...state, item }, toggleOverlay())} activeOpacity={0.5}  >
                <View style={styles.renderRow}>
                    <View style={styles.flatlistRow}>
                        <Icon
                            name='calendar'
                            type='font-awesome'
                            size={15}
                            color='grey'
                            style={{ marginRight: 5 }}
                        />
                        <Text>{item.tanggal}</Text>
                    </View>
                    <View style={styles.flatlistRow}>
                        <Text >{item.berat_badan}</Text>
                        <Text style={{ color: 'grey', fontFamily: 'Quicksand' }}> Kg </Text>
                        <Icon
                            name='weight'
                            type='font-awesome-5'
                            size={15}
                            color='grey'
                            style={{ marginRight: 0, marginLeft: 3 }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    let height = '100%'
    if (inputRecord) height = '78%'

    return (
        <>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <TouchableOpacity onPress={() => doDelete()} activeOpacity={0.5}  >
                    <Text style={styles.btnDelete}>Hapus Data</Text>
                </TouchableOpacity>
            </Overlay>

            <SafeAreaView style={styles.container}>
                <View style={{
                    backgroundColor: '#fff',
                    padding: 0,
                    elevation: 3,
                    width: '100%',
                    height: height,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <FlatList
                        style={styles.flatlist}
                        data={state.record}
                        renderItem={renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        stickyHeaderIndices={[0]}
                        ListHeaderComponent={
                            <View style={styles.flatListheader}>
                                <Text style={styles.flatListheaderTitle}>Tanggal</Text>
                                <Text style={styles.flatListheaderTitle}>Berat Badan</Text>
                            </View>}
                    />
                </View>
                {inputRecord ?
                    <>
                        {/* <InputDate set={e => set({ tanggal: e })} value={state.tanggal} mb={20} mt={20} /> */}
                        <InputWithTag
                            set={e => set({ berat_badan: e })}
                            value={state.berat_badan}
                            placeholder='Berat Badan'
                            tag='Kg'
                            mb={20}
                            mt={20}
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
                    </>
                    : null}
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
        padding: 0,
        elevation: 5,
        width: '100%',
        height: '100%',
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
        fontFamily: 'Quicksand',
    },
    btnDelete: {
        color: 'black',
        // fontWeight: 'bold',
        fontFamily: 'Quicksand',
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
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5
    },
    renderRow: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        padding: 10,
        justifyContent: 'space-between',

    },
    flatListheader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#a2b3ce',
        padding: 10,
    },
    flatListheaderTitle: {
        // fontWeight: "bold",
        color: '#fff',
        fontFamily: 'Quicksand',
        marginRight: 5,
        marginLeft: 5
    }
})
export default recordBB
