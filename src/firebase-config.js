import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEKAS7if6vbM4ZpQp5IOBMpVFxO-94EC0",
  authDomain: "bookie-6edc1.firebaseapp.com",
  projectId: "bookie-6edc1",
  storageBucket: "bookie-6edc1.appspot.com",
  messagingSenderId: "33787811064",
  appId: "1:33787811064:web:cd36e888c33c484086570d",
  measurementId: "G-LWF41SK4WW",
};

const app = initializeApp(firebaseConfig);
export const db = getFireStore(app);
