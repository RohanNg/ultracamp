import '@firebase/firestore';
import * as firebase from 'firebase';
import * as uuid from 'uuid';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDuwJ9p2KNFoXMbwf8F5Tnjg_k8Wimk2Qk",
  authDomain: "ultracamp-23946.firebaseapp.com",
  databaseURL: "https://ultracamp-23946.firebaseio.com",
  projectId: "ultracamp-23946",
  storageBucket: "ultracamp-23946.appspot.com",
  messagingSenderId: "1003405875505",
  appId: "1:1003405875505:web:3386ca8a66f99a46407810"
};

const app = firebase.initializeApp(firebaseConfig);

const db: firebase.firestore.Firestore = app.firestore()

async function uploadImage(uri: string): Promise<string> {
    const response = await fetch(uri)
    const blob = await response.blob()
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4())
  
    const snapshot = await ref.put(blob)
    const downloadURL = await snapshot.ref.getDownloadURL()
    return downloadURL
  }
  

export { app, db, uploadImage };

