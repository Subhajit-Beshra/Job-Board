import { auth } from "../firebase.js";
import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const form = document.querySelector("form");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("toggle-password");
const toggleConfirmPassword = document.getElementById("toggle-confirm-password");
const successToast = document.querySelector(".toast .success");
const successText = successToast?.querySelector("p");
const errorToast = document.querySelector(".toast .error");
const errorText = errorToast?.querySelector("p");

// show success message
const successMessage = (message) => {
    successText.textContent = message;
    successToast.classList.remove("hidden");
    setTimeout(() => {
        successToast.classList.add("hidden");
        window.location.href = "../SetUp/SetUp.html";
    },3000);
}
// show error message
const errorMessage = (message) => {
    errorText.textContent = message;
    errorToast.classList.remove("hidden");
    setTimeout(() => {
        errorToast.classList.add("hidden");
    });
}

const createToggle = (button, input) => {
    if (!button || !input) return;
    button.addEventListener("click", () => {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        button.innerHTML = isPassword ? '<i class="ri-eye-line text-xl"></i>' : '<i class="ri-eye-off-line text-xl"></i>';
        input.focus();
    });
};

createToggle(togglePassword, passwordInput);
createToggle(toggleConfirmPassword, confirmPasswordInput);

form.addEventListener("submit", async(e) => {
    // prevent refresh
    e.preventDefault();
    // read data
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

    // compare password values
    if (password !== confirmPassword) {
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
        successMessage("Account is created successfully!");
        form.reset();
        console.log(userCredential.user);
    }catch(error){
        errorMessage(error.message);
    }

})