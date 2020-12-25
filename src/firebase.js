const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCsWLfvnC_FQmBieC2p_mi9GuEiaViB6_U",
    authDomain: "herramientas-3dc98.firebaseapp.com",
    projectId: "herramientas-3dc98",
    storageBucket: "herramientas-3dc98.appspot.com",
    messagingSenderId: "679574294885",
    appId: "1:679574294885:web:47cfd0734b9f282536518c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage}