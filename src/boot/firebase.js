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
  //Your Config
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
