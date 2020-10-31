// Firebase configuration
var config = {
  apiKey: "AIzaSyCUkLQ4fo6tkszblndprD_f4U0GrikQwUg",
  authDomain: "africa-route.firebaseapp.com",
  databaseURL: "https://africa-route.firebaseio.com",
  projectId: "africa-route",
  storageBucket: "africa-route.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(config);

// Make auth, firestore references and realtime database
const db = firebase.firestore();
