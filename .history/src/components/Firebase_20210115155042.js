import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBZyni8I9vDxeZfcnH_cfY1N4597cZp_9g",
  authDomain: "mothersfood-a1de8.firebaseapp.com",
  databaseURL: "https://mothersfood-a1de8.firebaseio.com",
  projectId: "mothersfood-a1de8",
  storageBucket: "mothersfood-a1de8.appspot.com",
  messagingSenderId: "801490700383",
  appId: "1:801490700383:web:e13622c82e1d29a196b3ea",
  measurementId: "G-QKDQ3PGXJJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;