import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const firebaseConfig = {
    apiKey: "AIzaSyAqRNJaswgnytI3Zb5M-8K44m0v7ZhbdgQ",
    authDomain: "to-do-list-7e478.firebaseapp.com",
    projectId: "to-do-list-7e478",
    storageBucket: "to-do-list-7e478.appspot.com",
    messagingSenderId: "808645505421",
    appId: "1:808645505421:web:cf01254addc80b3b648dc4",
    measurementId: "G-F9YKYT7BS7"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
