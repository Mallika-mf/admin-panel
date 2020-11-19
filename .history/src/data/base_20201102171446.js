import * as firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import 'firebase/database';
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: "AIzaSyBtBTV7LJ6ch2CyakL2iIpppVWjNlXYOWk",
  authDomain: "mothersfoodtesting.firebaseapp.com",
  databaseURL: "https://mothersfoodtesting.firebaseio.com",
  projectId: "mothersfoodtesting",
  storageBucket: "mothersfoodtesting.appspot.com",
  messagingSenderId: "537550768022",
  appId: "1:537550768022:web:21711009b79025b75a3fb7",
  measurementId: "G-G9BL0Q6QQM"
});

export const db =  firebase.firestore();
export const database = firebase.database()
export const storage = firebase.storage()
export default app;