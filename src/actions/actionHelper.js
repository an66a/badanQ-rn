import AsyncStorage from "@react-native-community/async-storage";
import CryptoJS from 'crypto-js/';

const cryptoKey = 'keep-it-a-secret'; //Crypto Key

export const usrd = 'userData'; //AsyncStorage userData

export const checkUserData = () => {
    return () => {
        getStorage(usrd)
            .then(e => { console.log(e); })
    }
}

export const getStorage = (key) => {
    return (
        AsyncStorage.getItem(key)
            .then(e => {
                let storage = []
                if (e !== null) {
                    const decrypted = CryptoJS.AES.decrypt(e, cryptoKey);
                    const data = decrypted.toString(CryptoJS.enc.Utf8);
                    storage = JSON.parse(data)
                }
                return storage
            })
            .catch(err => { })
    )
}

export const saveStorage = (key, value) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), cryptoKey)
    const data = encrypted.toString()
    AsyncStorage.setItem(key, data)
}

//sortir data
export const userData = async () => {
    const user = await getStorage(usrd)
    const data = user.data
    const recordBB = data.recordBB

    //sort recordBB by date and remove key
    let newRecordBB = []
    for (const [key, value] of Object.entries(recordBB)) {
        newRecordBB.push(value)
    }
    const compare = (a, b) => {
        if (a.tanggal < b.tanggal) {
            return -1;
        }
        if (a.tanggal > b.tanggal) {
            return 1;
        }
        return 0;
    }

    newRecordBB.sort(compare)
    data.recordBB = newRecordBB
    //
    return user
}

