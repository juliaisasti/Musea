// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyD88Pf6oRkFwFt4tcuWwUGo_1muS7pWNok",

  authDomain: "musea-403609.firebaseapp.com",

  projectId: "musea-403609",

  storageBucket: "musea-403609.appspot.com",

  messagingSenderId: "384782570711",

  appId: "1:384782570711:web:75165b43a0a2fa115dcc92"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

//Initialize Auth
const auth = getAuth();
auth.useDeviceLanguage();
const user = auth.currentUser;
const provider = new GoogleAuthProvider();

//Initialize DDBB
const db = getFirestore(app);
const usersRef = collection(db, 'users');

let username = document.getElementById("googleUser");
let profilePicture = document.getElementById("userProfilePic")
let email = document.getElementById("userEmail")

// Sign In
async function googleSignIn () {
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

googleSignIn()

// Sign Out

document.getElementById("logOut").addEventListener("click", function (event) {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
)

// function googleSignOut() {
//     signOut(auth).then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });
// }

// googleSignOut()

// Estado del usuario

auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Logged user");
      username.innerHTML=user.displayName;
      profilePicture.innerHTML=`<img src=${user.photoURL}`;

      console.log(user);
    } else {
      console.log("No logged user");
    }
  }); 

// Pintar foto, nombre y usuario en Profile


// Función para obtener imagen random para el slider cada vez que se refresca la página
async function getSliderImg() {
  let id = Math.floor(Math.random() * 40000);
  try {
    let response2 = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    );
    let objectsImgData = await response2.json();
    let img = objectsImgData.primaryImage;
    let name = objectsImgData.title;
    document.getElementById("photoSlider").innerHTML = `<section>
        <img id="photoSlider" src="${img}" alt="${name}"
        <h1>${name}</h1>
        </section>`;
  } catch (error) {
    console.log("Error");
  }
}

getSliderImg();

//Función search bar

