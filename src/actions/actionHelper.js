import AsyncStorage from "@react-native-community/async-storage";
import CryptoJS from 'crypto-js/';

const cryptoKey = 'keep-it-a-secret'; //Crypto Key

export const usrt = 'userData'; //AsyncStorage userToken

export const checkUserData = () => {
    return () => {
        getStorage(usrt)
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

