import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0RweRMOjJf3MpB2nn6qdhZC2YuqhHvD0",
  authDomain: "e-commerce-ac29f.firebaseapp.com",
  projectId: "e-commerce-ac29f",
  storageBucket: "e-commerce-ac29f.appspot.com",
  messagingSenderId: "735560193533",
  appId: "1:735560193533:web:bba26aec7069a5e45cf594",
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export { storage };
