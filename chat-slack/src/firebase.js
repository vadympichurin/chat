import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


// initialize firebase
  let config = {
    apiKey: "AIzaSyCr06_UW9uSoHKcS5-1J_3kZvgssB6UZS4",
    authDomain: "chat-slack-1adf4.firebaseapp.com",
    databaseURL: "https://chat-slack-1adf4.firebaseio.com",
    projectId: "chat-slack-1adf4",
    storageBucket: "chat-slack-1adf4.appspot.com",
    messagingSenderId: "998294863798"
  };
  firebase.initializeApp(config);

  export default firebase;