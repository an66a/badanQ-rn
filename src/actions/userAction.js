import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { useDispatch } from 'react-redux';
import register from '../screens/auth/register';

import { getStorage, createUserToken, saveStorage, usrt } from './actionHelper';

const db = database();
const store = storage();

export const LOADING = 'LOADING';
export const INSTRUCTOR = 'INSTRUCTOR';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REGISTERED = 'USER_REGISTERED';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export const isLoading = (time) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        wait(time).then(() => dispatch({ type: LOADING, payload: false }));
    }
}

const firebaseLogin = (email, password) => new Promise((resolve, reject) => {
    console.log('firebase', email, password);
    auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            resolve(res.user.uid)
        })
        .catch(err => {
            switch (err.code) {
                case "auth/user-not-found":
                    alert("User tidak terdaftar!");
                    break;
                case "auth/wrong-password":
                    alert("Kata sandi/password yang anda masukan salah.");
                    break;
                default:
            }
        })
})

export const userLogin = (email, password) => {
    return (dispatch) => {
        dispatch(isLoading(5000))
        console.log('user login', email, password);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            db.ref('users/').once('value', res => {
                for (const [key, value] of Object.entries(res.val())) {
                    if (email === value.username) {
                        firebaseLogin(value.email, password).then(uid => {
                            const user = { ...value, uid }
                            saveStorage(usrt, user)
                            dispatch(checkUserState())
                        })
                        return
                    }
                }
                alert('User tidak terdaftar.')
                dispatch({ type: LOADING, payload: false })
            })
        }
        if (reg.test(email) === true) {
            firebaseLogin(email, password).then(uid => {
                db.ref('users/' + uid).once('value', res => {
                    const data = res.val()
                    const user = { ...data, uid }
                    saveStorage(usrt, user)
                    dispatch(checkUserState())
                })
            })
        }
    }
}

export const userSignUp = (userdata) => {
    return (dispatch) => {
        dispatch(isLoading(5000))
        const role = 'user';
        const { username, password, email, nama, jeniskelamin, fotopath, pekerjaan, alasan, tanggallahir, telepon, fotoname } = userdata;
        auth().createUserWithEmailAndPassword(email, password).then(res => {
            store.ref('/users/' + res.user.uid + '/' + fotoname).putFile(fotopath).then(async () => {
                const foto = await store.ref('/users/' + res.user.uid + '/' + fotoname).getDownloadURL();
                db.ref('users/' + res.user.uid).set({ username, email, nama, jeniskelamin, role, pekerjaan, alasan, tanggallahir, telepon, foto })
                dispatch({ type: USER_REGISTERED })
            })
        })
            .catch(err => {
                switch (err.code) {
                    case 'auth/invalid-email':
                        alert('Format email salah!');
                        break;
                    case 'auth/weak password':
                        alert('Password terlalu lemah!');
                        break;
                    case 'auth/email-already-in-use':
                        alert('Email sudah terdaftar');
                        break;
                    default:
                }
            })
    }
}

export const userLogout = () => {
    return (dispatch) => {
        AsyncStorage.removeItem(usrt).then(res => console.log(res))
        dispatch({ type: USER_LOGOUT })
    }
}

export const checkUserState = () => {
    return (dispatch) => {
        getStorage(usrt).then(res => {
            if (res.role === 'instruktur') {
                dispatch({ type: INSTRUCTOR, payload: res })
            } else if(res.role === 'user'){
                dispatch({ type: USER_LOGIN, payload: res })
            }
        })
    }
}

