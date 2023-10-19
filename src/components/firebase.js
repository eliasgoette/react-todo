// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_J9E5DyL2HsWIwE-yTJCg2bFxNLj4bW8",
  authDomain: "react-todo-1be64.firebaseapp.com",
  projectId: "react-todo-1be64",
  storageBucket: "react-todo-1be64.appspot.com",
  messagingSenderId: "730379942065",
  appId: "1:730379942065:web:5f54092c0c8193e9fa8a90",
  measurementId: "G-M8CNKP8ZXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider('6Lev5bMoAAAAADfOOwnPH8hvtvM4KFMB3GmAampT'),
  isTokenAutoRefreshEnabled: true
});
const analytics = getAnalytics(app);