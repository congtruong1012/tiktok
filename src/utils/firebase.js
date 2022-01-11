import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyBwnNeI_q2rEY91V1IaTAzyNwKrnb0oiZg",
  authDomain: "authentication-f9b30.firebaseapp.com",
  // ...
};

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "/",
};

const app = firebase.initializeApp(config);

export { config, uiConfig, app };
