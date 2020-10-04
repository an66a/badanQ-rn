import { db, auth, storage } from '../firebase'

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogin = (username, password) => {
    return (dispatch) => {
        db.ref('users/account/').once('value', res => {
            for (const [key, value] of Object.entries(res.val())) {
                if (username === value.username) {
                    auth.signInWithEmailAndPassword(value.email, password)
                        .then(res => {
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
                                case "auth/invalid-email":
                                    alert("Format email salah!");
                                    break;
                                case "auth/argument-error":
                                    alert("Masukan alamat email!");
                                    break;
                                default:
                            }
                        })
                }
            }
        })
    }
}

export const userSignUp = (userdata) => {
    return (dispatch) => {
        const role = 'member'
        const { username, password, email, nama, jenis_kelamin } = userdata
        auth.createUserWithEmailAndPassword(email, password).then(res => {
            console.log(res);
            db.ref('users/account/' + res.user.uid).set({ username, email, nama, jenis_kelamin, role })
            dispatch({ type: USER_LOGIN })
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