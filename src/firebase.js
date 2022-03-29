// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from 'firebase/functions';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_taUg9_OMXZ70-_UkmwXfB5Ufx856n0k",
  authDomain: "weatherapp-315813.firebaseapp.com",
  projectId: "weatherapp-315813",
  storageBucket: "weatherapp-315813.appspot.com",
  messagingSenderId: "178276175492",
  appId: "1:178276175492:web:d35a8d0ddbc12cf36c7cd1",
  measurementId: "G-7HS21HV4EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const getForcast = httpsCallable(functions, 'getForcast');


export default getForcast;