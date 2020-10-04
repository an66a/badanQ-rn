import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Button } from 'react-native';
import RegisComp from '../../components/RegisterComponent'
import { useDispatch } from 'react-redux';
import { userSignUp } from '../../actions/userAction'

const Tabs = createMaterialTopTabNavigator();

const pageOne = (props) => {
  return (
    <RegisComp pageOne hidepass nav={props.navigation} route={props.route} />
  )
}
const pageTwo = (props) => {
  return (
    <RegisComp pageTwo nav={props.navigation} route={props.route} />
  )
}

const register = (props) => {

  const dispatch = useDispatch()

  let btnTitle = 'Next'
  let state = props.route.state
  let user, data;

  if (state) {
    if (state.index === 1) btnTitle = 'Complete Registration'
    user = state.routes[0].params
    data = state.routes[1].params
  }

  const doSignUp = () => {
    const userdata = { ...user, ...data }
    dispatch(userSignUp(userdata))
  }

  const nextButton = () => {
    if (state.index === 1) {
      if (data.jenis_kelamin === '' || data.nama === '') return alert('Harap isi lengkap data.');
      doSignUp()
      return
    }
    let text = user.email
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passw = /^[A-Za-z]\w{5,14}$/;

    if (user.username === '' || user.password === '' || user.email === '') return alert('Harap isi lengkap data.')
    if (!user.password.match(passw)) return alert('Password minimal 6 karakter.')
    if (reg.test(text) === false) return alert("Format email salah.")
    if (user.password !== user.repassword) return alert('Password tidak sama.')
    props.navigation.navigate('regisPage 2', Keyboard.dismiss())
  }

  const backButton = () => {
    let back = 'Login'
    if (state.index === 1) back = 'regisPage 1'
    props.navigation.navigate(back)
  }

  return (
    <>
      <Tabs.Navigator tabBarPosition='none' initialRouteName="regisPage 1" swipeEnabled={true}>
        <Tabs.Screen name='regisPage 1' component={pageOne} />
        <Tabs.Screen name='regisPage 2' component={pageTwo} />
      </Tabs.Navigator>

      {/* NAVIGASI BAWAH */}
      <View style={styles.bottomBtn}>
        <TouchableOpacity />
        <TouchableOpacity style={styles.inputBtn} onPress={() => backButton()}>
          <Text style={styles.btnTitle}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputBtn} onPress={() => nextButton()}>
          <Text style={styles.btnTitle} >{btnTitle}</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  btnTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomBtn: {
    flex: 0,
    flexDirection: 'row',
    padding: 0,
    justifyContent: "space-between"
  },
  inputBtn: {
    width: '50%',
    backgroundColor: '#00a2ff',
    borderRadius: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0
  }
})

export default register

