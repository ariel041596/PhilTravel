import * as firebase from "firebase/app";
// import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";
import "firebase/firebase-database";
import "firebase/storage";
import "firebase/firestore";
import "firebase/functions";
// import "firebase/firebase-messaging";

import Vue from "vue";
import VueFirestore from "vue-firestore";
Vue.use(VueFirestore, {
  key: "id",
  enumerable: true
});

var firebaseConfig = {
  apiKey: "AIzaSyBNJRh5PQsngFCByPmSPRpbYNcOIIFAL0w",
  authDomain: "philtravel-673e7.firebaseapp.com",
  databaseURL: "https://philtravel-673e7.firebaseio.com",
  projectId: "philtravel-673e7",
  storageBucket: "philtravel-673e7.appspot.com",
  messagingSenderId: "391616918352",
  appId: "1:391616918352:web:2c9bb0c1ec74b5c62b3255",
  measurementId: "G-59RNN93E41"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = fb.database();
const fc = firebase.functions();
const fs = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("profile");
provider.addScope("email");
// const fcm = firebase.messaging();

// export { fb, db, fc, fs, fcm };
export { fb, db, fc, fs, provider };
