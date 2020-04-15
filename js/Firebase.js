import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAki8a12PzCCya9cJ_DNsLc3syf8_whTIk",
  authDomain: "motivationalquotes-9e6ae.firebaseapp.com",
  databaseURL: "https://motivationalquotes-9e6ae.firebaseio.com",
  projectId: "motivationalquotes-9e6ae",
  storageBucket: "motivationalquotes-9e6ae.appspot.com",
  messagingSenderId: "631376657953",
  appId: "1:631376657953:web:ee87848810561836066d60",
  measurementId: "G-F1E884C4TL",
};

export default class Firebase {
  static db;

  static init() {
    firebase.initializeApp(config);
    Firebase.db = firebase.firestore();
  }
}

// Firebase.init()
// Firebase.db...
