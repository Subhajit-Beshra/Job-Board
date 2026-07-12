import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const form = document.querySelector("form");
// form submission
form.addEventListener("submit", async(e) => {
    // prevent page refresh
    e.preventDefault();
    // data read
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    // Exception Handling
    try{
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        alert("Login Successful!");
        console.log(userCredential.user);
    }catch(error){
        alert(error.message);
    }
})

// logic for reset password
const resetPassword = document.getElementById("reset-password");
// password submission
resetPassword.addEventListener("click", async(e) =>{
    // prevent page refresh
    e.preventDefault();
    // check email
    const email = document.querySelector('input[type="email"]').value;
    if(!email){
        alert("To reset password enter your email!")
        return;
    }
    try{
        await sendPasswordResetEmail(
            auth,
            email
        );
        alert("Password reset link has been sent to your email.");
    }catch(error){
        alert(error.message);
    }
})