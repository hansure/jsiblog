import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDfKm-K4Z_tRah7xJidw3-9loL4YaSdOJM',
  authDomain: 'jsiblog.firebaseapp.com',
  databaseURL: 'https://jsiblog.firebaseio.com',
  projectId: 'jsiblog',
  storageBucket: 'jsiblog.appspot.com',
  messagingSenderId: '370316878007',
  appId: '1:370316878007:web:dea8e6b9c4eae1c49b2d32',
  measurementId: 'G-JL609QB4P8',
}

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
  }
}
