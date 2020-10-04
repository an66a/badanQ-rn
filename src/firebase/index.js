import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBAxEN2onH1k8ZKfhbQGTC4pL-UkgftGfM",
    authDomain: "react-g2-project.firebaseapp.com",
    databaseURL: "https://react-g2-project.firebaseio.com",
    projectId: "react-g2-project",
    storageBucket: "react-g2-project.appspot.com",
    messagingSenderId: "453155435716",
    appId: "1:453155435716:web:d4ba934c693061eb0dc591"
};

app.initializeApp(config);
const db = app.database();
const auth = app.auth(); 
const storage = app.storage();

export { db, auth, storage }