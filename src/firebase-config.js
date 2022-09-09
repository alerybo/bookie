import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  initializeFirestore,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

export default app;
initializeFirestore(app, {
  ignoreUndefinedProperties: true
});
export const db = getFirestore(app);


export const createUserDocument = async (user) => {
  if (!user) return;
  try {
    const { email, uid } = user;
    const data = {
      email,
      id: uid,
      myBooks: [],
    };
    await setDoc(doc(db, "users", `${user.uid}`), data);
  } catch (error) {
    console.log(error);
  }
};

export const getMyBooks = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.myBooks;
  } else {
    console.log("error");
  }
};

export const updateMyBooks = async (myBooks, id) => {
  if (!myBooks || !id) return;
  console.log(myBooks);
  try {
    await updateDoc(doc(db, "users", `${id}`), { myBooks: myBooks });
  } catch (error) {
    console.log(error);
  }
};
