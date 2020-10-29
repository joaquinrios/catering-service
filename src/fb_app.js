import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyBAqRvIvfrEiaODQrwGBVN_osYZGTSPL_8",
  authDomain: "catering-service-35e8b.firebaseapp.com",
  databaseURL: "https://catering-service-35e8b.firebaseio.com",
  projectId: "catering-service-35e8b",
  storageBucket: "catering-service-35e8b.appspot.com",
  messagingSenderId: "491587695402",
  appId: "1:491587695402:web:e023d101999c3db66d6453"
});

export const auth = firebase.auth();
