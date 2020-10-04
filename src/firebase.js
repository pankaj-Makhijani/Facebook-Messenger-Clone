// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
import "firebase/firestore"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBwZqsl4zCTNWas8XWRfoR6ijZQjilNG-A",
    authDomain: "facebook-messenger-clone-dc989.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-dc989.firebaseio.com",
    projectId: "facebook-messenger-clone-dc989",
    storageBucket: "facebook-messenger-clone-dc989.appspot.com",
    messagingSenderId: "535549743041",
    appId: "1:535549743041:web:88ce407431bfc225956940",
    measurementId: "G-8PZTLKKPK3"
  });

  const db = firebaseApp.firestore();

  export default db;