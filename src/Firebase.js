import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
    apiKey: 'AIzaSyCMbEsoHrYNifgv9_Frmd_qyVJNUWZmmYE',
    authDomain: 'team-reporter-d3954.firebaseapp.com',
    databaseURL: 'https://team-reporter-d3954-default-rtdb.firebaseio.com',
    projectId: 'team-reporter-d3954',
    storageBucket: 'team-reporter-d3954.appspot.com',
    messagingSenderId: '255632376788',
    appId: '1:255632376788:web:19dd42c8fde6feb5008c41',
    measurementId: 'G-YQLC83PQB4',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const stateChange = onAuthStateChanged;

export {firebaseConfig,auth,db,stateChange}