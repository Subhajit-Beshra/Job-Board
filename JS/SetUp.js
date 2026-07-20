import { auth, db } from "../firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";



const name = document.getElementById("name");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");
const successToast = document.querySelector(".toast .success");
const successText = document.querySelector("p");

const showToast = (message) => {
    successText.textContent = message;
    successToast.classList.remove('hidden');
    setTimeout(() => {
        successToast.classList.add('hidden');
        window.location.href = "../Home Page/HomePage.html";
    }, 2000);
}

const form = document.querySelector("form");

form.addEventListener("submit", async(e) => {

    // prevent refresh
    e.preventDefault();
    
    // check if user is logged in
    onAuthStateChanged(auth, async(user) => {

        try{

            await setDoc(doc(db, "users", user.uid), {
                name: name.value,
                phone: phone.value,
                address: address.value,
                city: city.value,
                state: state.value,
                country: country.value,
                createdAt: new Date()
            }, { merge: true });

            showToast("Profile saved successfully!");
            form.reset();

        }catch(error){

            console.error(error);
            alert(error.message);
        }
    });

});