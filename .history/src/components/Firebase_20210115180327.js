import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBtBTV7LJ6ch2CyakL2iIpppVWjNlXYOWk",
  authDomain: "mothersfoodtesting.firebaseapp.com",
  databaseURL: "https://mothersfoodtesting.firebaseio.com",
  projectId: "mothersfoodtesting",
  storageBucket: "mothersfoodtesting.appspot.com",
  messagingSenderId: "537550768022",
  appId: "1:537550768022:web:21711009b79025b75a3fb7",
  measurementId: "G-G9BL0Q6QQM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;