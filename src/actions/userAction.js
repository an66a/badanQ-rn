import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import { getStorage, saveStorage, userData, usrd } from './actionHelper';

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
    // console.log('firebase', email, password);
    auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            resolve(res.user.uid)
            console.log(res);
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
        // console.log('user login', email, password);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            db.ref('users/').once('value', res => {
                for (const [key, value] of Object.entries(res.val())) {
                    if (email === value.username) {
                        firebaseLogin(value.email, password).then(uid => {
                            const user = { ...value, uid }
                            // console.log(user);
                            saveStorage(usrd, user)
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
                    saveStorage(usrd, user)
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
                dispatch({ type: USER_REGISTERED, payload: true })
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
        auth().signOut()
        AsyncStorage.removeItem(usrd)
        dispatch({ type: USER_LOGOUT })
    }
}

export const checkUserState = () => {
    return async (dispatch) => {
        const user = await userData();
        // console.log(user);
        if (user === undefined) return

        if (user.role === 'instruktur') {
            dispatch({ type: INSTRUCTOR, payload: user })
        } else if (user.role === 'user') {
            dispatch({ type: USER_LOGIN, payload: user })
        }

    }
}

// export const checkUser = () => {
//     return async (dispatch) => {
//         const user = await getStorage(usrd)
//         console.log(user);
//         const newRecord = await db.ref('users/' + user.uid + '/data/recordBB/').once('value')
//         const newRecordBB = newRecord.val()

//         console.log(newRecordBB);
//     }
// }

export const addRecordBB = (record) => {
    return async (dispatch) => {
        // console.log(record);
        const user = await getStorage(usrd)

        db.ref('users/' + user.uid + '/data/recordBB/').push(record)
        const newRecord = await db.ref('users/' + user.uid + '/data/recordBB/').once('value')
        const newRecordBB = newRecord.val()

        if (user.data) {
            const data = user.data
            data.recordBB = newRecordBB
            saveStorage(usrd, user)
            dispatch(checkUserState())
        } else {
            let recordBB = newRecordBB
            let data = { recordBB }
            let newUserData = { ...user, data }
            saveStorage(usrd, newUserData)
            dispatch(checkUserState())
        }
    }
}

export const deleteRecordBB = (item) => {
    return async (dispatch) => {
        // console.log('item', item);
        const user = await getStorage(usrd)

        const dataRecord = await db.ref('users/' + user.uid + '/data/recordBB/').once('value')
        const record = dataRecord.val()

        for (const [key, value] of Object.entries(record)) {
            if (item.tanggal === value.tanggal && item.berat_badan === value.berat_badan) {
                db.ref('users/' + user.uid + '/data/recordBB/' + key).remove()
                break
            }
        }

        const newRecord = await db.ref('users/' + user.uid + '/data/recordBB/').once('value')
        const newRecordBB = newRecord.val()
        const data = user.data
        data.recordBB = newRecordBB
        saveStorage(usrd, user)
        dispatch(checkUserState())
    }
}

export const deleteAllRecordBB = () => {
    return async (dispatch) => {
        // console.log('item', item);
        const user = await getStorage(usrd)

        db.ref('users/' + user.uid + '/data/recordBB/').remove()

        delete user.data
        console.log(user);
        saveStorage(usrd, user)
        dispatch(checkUserState())
    }
}
