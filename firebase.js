  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDf2z277Ue0Gg49qeaFkZIny7EzkM7gAfM",
    authDomain: "job-board-42a3e.firebaseapp.com",
    projectId: "job-board-42a3e",
    storageBucket: "job-board-42a3e.firebasestorage.app",
    messagingSenderId: "788848451441",
    appId: "1:788848451441:web:2e45e91a699658a69d60d0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  export { auth };