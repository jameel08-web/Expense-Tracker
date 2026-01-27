import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSeNYOvpQRlpf6zVRuVbIW2IuHXjcPArA",
    authDomain: "expense-tracker-2f587.firebaseapp.com",
    projectId: "expense-tracker-2f587",
    storageBucket: "expense-tracker-2f587.firebasestorage.app",
    messagingSenderId: "975230586596",
    appId: "1:975230586596:web:ddfeaf98fed1c080e6e6f1",
    measurementId: "G-94HB8B5198"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);