import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const form = document.querySelector("form");
const successToast = document.querySelector(".toast .success");
const successText = successToast?.querySelector("p");
const errorToast = document.querySelector(".toast .error");
const errorText = errorToast?.querySelector("p");
const resetToast = document.querySelector(".toast .reset-psd");
const resetText = resetToast?.querySelector("p");

// success message
const showSuccess = (message) => {
    successText.textContent = message;
    successToast.classList.remove("hidden");
    setTimeout(() => {
        successToast.classList.add("hidden");
    }, 3000);
};

// error message
const showError = (message) => {
    errorText.textContent = message;
    errorToast.classList.remove("hidden");
    setTimeout(() => {
        errorToast.classList.add("hidden");
    }, 3000);
};
//reset message
const showReset = (message) => {
    resetText.textContent = message;
    resetToast.classList.remove('hidden');
    setTimeout(() => {
        resetToast.classList.add('hidden');
    }, 3000);
}

// form submission
form.addEventListener("submit", async(e) => {
    // prevent page refresh
    e.preventDefault();
    // data read
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if(!email || !password){
        showError("Please fill all fields!");
        return;
    }

    // Exception Handling
    try{
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        // show success
        showSuccess("Login Successful!");
        form.reset();
        console.log(userCredential.user);
    }catch(error){

        switch(error.code){
            case "auth/invalid-credential":
                showError("Invalid email or password");
                break;
            case "auth/too-many-requests":
                showError("Too many failed attempts. Try again later.");
                break;
            default:
                showError("Login failed! Please try again.") ;   
                break;
        }
        console.error(error);
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
        showError("To reset password enter your email!")
        return;
    }
    try{
        await sendPasswordResetEmail(
            auth,
            email
        );
        showReset("Password reset link has been sent to your email.");
    }catch(error){
        // showError
        switch(error.code){

            case "auth/invalid-credential":
                showError("No account found with this email!");
                break;
            default:
                showError("Couldn't send reset link to your email!");
                break;
        }
        console.error(error);
    }
})

