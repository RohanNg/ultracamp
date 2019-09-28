import '@firebase/firestore';
import { Notifications, Permissions } from 'expo';
import * as firebase from 'firebase';
import uuid from 'uuid';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDuwJ9p2KNFoXMbwf8F5Tnjg_k8Wimk2Qk",
  authDomain: "ultracamp-23946.firebaseapp.com",
  databaseURL: "https://ultracamp-23946.firebaseio.com",
  projectId: "ultracamp-23946",
  storageBucket: "ultracamp.appspot.com",
  messagingSenderId: "1003405875505",
  appId: "1:1003405875505:web:3386ca8a66f99a46407810"
};

const app = firebase.initializeApp(firebaseConfig);

const db: firebase.firestore.Firestore = app.firestore()

// Upload image to firebase given image URI
// Return Promise<image url>
async function uploadImage(uri) {
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

// Register for push notification and return device token to push notification to this device
export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  )
  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync()
  return token
}
