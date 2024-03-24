import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration must be secret

const firebaseConfig = {
  apiKey: "AIzaSyCvmFTYJoAOJb6RLuon99kDXqXc0NP3_ZI",
  authDomain: "ua-itrevolution-24.firebaseapp.com",
  projectId: "ua-itrevolution-24",
  storageBucket: "ua-itrevolution-24.appspot.com",
  messagingSenderId: "64304178996",
  appId: "1:64304178996:web:a9d5e92550351516ffa761",
};

const app = initializeApp(firebaseConfig);

export const store = getFirestore(app);
