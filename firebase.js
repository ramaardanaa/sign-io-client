import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCiatYSJZptKW5g5IHTRAHNgbqNLGYQZDI",
  authDomain: "sign-io-expo.firebaseapp.com",
  databaseURL: "https://sign-io-expo-default-rtdb.firebaseio.com",
  projectId: "sign-io-expo",
  storageBucket: "sign-io-expo.appspot.com",
  messagingSenderId: "381619160866",
  appId: "1:381619160866:web:4d27991d95ad9d4fac077b"
};

firebase.initializeApp(firebaseConfig);