import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

const db = database();
const store = storage();

export const LOADING = 'LOADING';
export const INSTRUCTOR = 'INSTRUCTOR';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

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

export const userLogin = (email, password) => {
    return (dispatch) => {
        // check database
        // db.ref().once('value', res => {
        //     console.log(res.val());
        // })
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            db.ref('users/').once('value', res => {
                for (const [key, value] of Object.entries(res.val())) {
                    if (email === value.username) {
                        auth().signInWithEmailAndPassword(value.email, password)
                            .then((res) => {
                                console.log(res);
                                dispatch({ type: USER_LOGIN })
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
                        break
                    }
                }

            })

        }
    }
}

export const userSignUp = (userdata) => {
    return (dispatch) => {
        // console.log(userdata);
        const role = 'member';
        const { username, password, email, nama, jeniskelamin, fotopath, pekerjaan, alasan, tanggallahir, telepon } = userdata;
        auth().createUserWithEmailAndPassword(email, password).then(res => {
            store.ref('/users/' + res.user.uid).putFile(fotopath).then(async () => {
                const foto = await store.ref('/users/' + res.user.uid).getDownloadURL();
                db.ref('users/' + res.user.uid).set({ username, email, nama, jeniskelamin, role, pekerjaan, alasan, tanggallahir, telepon, foto })
                dispatch({ type: USER_LOGIN })
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
