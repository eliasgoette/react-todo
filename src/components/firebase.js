// Import required classes/functions from Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getAuth, signInAnonymously, GoogleAuthProvider } from "firebase/auth";  
import { getFirestore, CACHE_SIZE_UNLIMITED, IndexedDbLocalCache } from "firebase/firestore";  

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_J9E5DyL2HsWIwE-yTJCg2bFxNLj4bW8",
  authDomain: "react-todo-1be64.firebaseapp.com",
  projectId: "react-todo-1be64",
  storageBucket: "react-todo-1be64.appspot.com",
  messagingSenderId: "730379942065",
  appId: "1:730379942065:web:5f54092c0c8193e9fa8a90",
  measurementId: "G-M8CNKP8ZXC"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and set up the Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with new cache settings
const db = getFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  localCache: new IndexedDbLocalCache() // Enable IndexedDb for offline persistence
});

// Initialize App Check with ReCaptcha
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider('6Lev5bMoAAAAADfOOwnPH8hvtvM4KFMB3GmAampT'),
  isTokenAutoRefreshEnabled: true
});

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

export { app, appCheck, auth, signInAnonymously, googleProvider, db, analytics, logEvent };