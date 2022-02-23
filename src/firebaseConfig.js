import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const config = {
  apiKey: "AIzaSyDeAi9E6kQ3XFfU3UrsSMUgMlBn3JZFrnk",
  authDomain: "electrical-4ce27.firebaseapp.com",
  databaseURL: "https://electrical-4ce27.firebaseio.com",
  projectId: "electrical-4ce27",
  storageBucket: "electrical-4ce27.appspot.com",
  messagingSenderId: "757401328953",
  appId: "1:757401328953:web:2fed96a4e97baff2e39ce8",
};

const firebase = initializeApp(config);
export const messaging = getMessaging();
