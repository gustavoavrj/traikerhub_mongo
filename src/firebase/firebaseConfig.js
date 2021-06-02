import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/storage";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

//import dataConfig from './dataConfig'

const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyDC31pHUzNXjJZa6uZB2wiaMWMDHFanPGo",
        authDomain: "trailerhub-b0980.firebaseapp.com",
        projectId: "trailerhub-b0980",
        storageBucket: "trailerhub-b0980.appspot.com",
        messagingSenderId: "1066509461",
        appId: "1:1066509461:web:9f282c6534995ce468e79c"
    
  }
);

const storage = app.storage();
export default storage
