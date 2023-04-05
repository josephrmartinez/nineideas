// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyA15NyUlWfwgEI-s8G5Tt6LW3BvKtSbXq0",

  authDomain: "nineideas-a66db.firebaseapp.com",

  projectId: "nineideas-a66db",

  storageBucket: "nineideas-a66db.appspot.com",

  messagingSenderId: "795487404505",

  appId: "1:795487404505:web:c88d59afcb60f830eb99c8",

  measurementId: "G-YWT39RW7V5"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);