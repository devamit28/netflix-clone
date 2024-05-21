import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAEiFFa8NXzHRiyvgOPSgSZ0UW8tKwmdxA",
  authDomain: "netflix-clone-eb5fa.firebaseapp.com",
  projectId: "netflix-clone-eb5fa",
  storageBucket: "netflix-clone-eb5fa.appspot.com",
  messagingSenderId: "596187715606",
  appId: "1:596187715606:web:48c74b55dc2e9d7b4bbd37"
};


const app = initializeApp(firebaseConfig);

export const fireBaseAuth = getAuth(app);