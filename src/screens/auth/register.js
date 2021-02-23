import React, { useState, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Alert, Image, SafeAreaView } from 'react-native';
import RegisComp from '../../components/RegisterComponent'
import { useDispatch, useSelector } from 'react-redux';
import { userSignUp, isLoading, USER_REGISTERED } from '../../actions/userAction'
import { Icon, Overlay } from 'react-native-elements';
import { Button } from '../../components/elements/'

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
const pageThree = (props) => {
  return (
    <RegisComp pageThree nav={props.navigation} route={props.route} />
  )
}

const register = (props) => {
  // console.log(props);
  const dispatch = useDispatch()
  const regis = useSelector(state => state.user.isRegistered)

  const [isBottomBar, setBottomBar] = useState(true);
  const [marginLogo, setMarginLogo] = useState('25%');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // setKeyboardVisible(true); 
        setBottomBar(false)
        setMarginLogo('10%')
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // setKeyboardVisible(false);
        setBottomBar(true)
        setMarginLogo('25%')
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  let btnTitle = 'Next'
  let state = props.route.state
  let user, data, data2;

  if (state) {
    if (state.index === 2) btnTitle = 'Complete Registration'
    user = state.routes[0].params
    data = state.routes[1].params
    data2 = state.routes[2].params
  }

  const doSignUp = () => {
    const userdata = { ...user, ...data, ...data2 }
    dispatch(userSignUp(userdata))
    // dispatch(isLoading(15000))
  }

  const nextButton = () => {
    if (state.index === 1) {
      if (data.jeniskelamin === '' || data.nama === '' || data.tanggallahir === '' || data.telepon === '') {
        alert('Harap isi lengkap data.');
        return
      }
      props.navigation.navigate('regisPage 3', Keyboard.dismiss())
      return
    }
    if (state.index === 2) {
      if (data2.alasan === '' || data2.fotopath === '' || data2.pekerjaan === '') return alert('Harap isi lengkap data.');
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
    if (state.index === 2) back = 'regisPage 2'
    props.navigation.navigate(back)
  }

  // const isRegistered = useSelector(state => state.user.isRegistered)


  // const toggleOverlay = () => {
  //   setVisible(!visible);
  // };

  return (
    <>
{/* 
      <Overlay isVisible={isRegistered} onBackdropPress={toggleOverlay} >
        <View style={{ flex: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'ce' }}>
        <Text style={styles.btnDelete}>Registrasi Berhasil</Text>
        <TouchableOpacity onPress={() => dispatch({ type: USER_REGISTERED, payload: false }, props.navigation.navigate('Login'))} activeOpacity={0.5} style={styles.toLoginBtn} >
          <Text style={{ color: '#fff' }}>Ke Halaman Login</Text>
        </TouchableOpacity>
        </View>
      </Overlay> */}

      <SafeAreaView style={styles.container} >
        <View style={{ alignItems: 'center', marginTop: marginLogo }}>
          <Image
            style={styles.logo}
            source={require('../../img/logo.png')}
          />
        </View>

        {/* PAGES */}
        <Tabs.Navigator tabBarPosition='none' initialRouteName="regisPage 1" backBehavior={'initialRoute'} swipeEnabled={true}>
          <Tabs.Screen name='regisPage 1' component={pageOne} />
          <Tabs.Screen name='regisPage 2' component={pageTwo} />
          <Tabs.Screen name='regisPage 3' component={pageThree} />
        </Tabs.Navigator>

        {/* NAVIGASI BAWAH */}
        {isBottomBar ?
          <View style={styles.bottomBtn}>

            <TouchableOpacity style={styles.inputBtn} activeOpacity={0.7} onPress={() => backButton()}>
              <Text style={styles.btnTitle}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputBtn} activeOpacity={0.7} onPress={() => nextButton()}>
              <Text style={styles.btnTitle} >{btnTitle}</Text>
            </TouchableOpacity>
          </View>
          : null}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  btnTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomBtn: {
    flex: 0,
    flexDirection: 'row',
    padding: 0,
    justifyContent: "space-between",
    marginTop: 0
  },
  inputBtn: {
    width: '50%',
    backgroundColor: '#2f4c88',
    borderRadius: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0
  },
  toLoginBtn: {
    width: '100%',
    backgroundColor: '#2f4c88',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 20
  }
})

export default register

