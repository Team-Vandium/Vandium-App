import firebase from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyC5FWj5mBLxgT9pQvLRIFNwbm0y5rhVjHA',
  authDomain: 'vandium-fd197.firebaseapp.com',
  databaseURL: 'https://vandium-fd197-default-rtdb.firebaseio.com',
  projectId: 'vandium-fd197',
  storageBucket: 'vandium-fd197.appspot.com',
  messagingSenderId: '39431817540',
  appId: '1:39431817540:web:2dc9b78ac9ca1e8bfeef11',
  measurementId: 'G-CH5YT23F9N',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
