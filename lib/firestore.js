import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    where,
    query,
    getDocs,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCt0AyCJaxgXuU4ht2AMdjGXG7eCiftH-0",
    authDomain: "product-finder-3cd96.firebaseapp.com",
    projectId: "product-finder-3cd96",
    storageBucket: "product-finder-3cd96.appspot.com",
    messagingSenderId: "882781882490",
    appId: "1:882781882490:web:a71cf7aaf3ea12cc5353c3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getData(colName, whereFunc = null) {
    var q;
    if (whereFunc) {
        q = query(collection(db, colName), whereFunc);
    } else {
        q = query(collection(db, colName));
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export { getData };
