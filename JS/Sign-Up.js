import { auth } from "../firebase.js";
import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


const form = document.querySelector("form");

form.addEventListener("submit", async(e) => {
    // prevent refresh
    e.preventDefault();
    // read data
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

    // compare password values
    if (password.value !== confirmPassword.value) {
        // handle mismatch (simple alert for now)
        alert('Passwords do not match.');
        return;
    }
    // Exception Handling
    try{
        // create user
        const userCredential = await createUserWithEmailAndPassword(

            auth,
            email,
            password,
        );
        alert("Account is created successfully!");
        console.log(userCredential.user);
    }catch(error){
        alert(error.message);
    }

})