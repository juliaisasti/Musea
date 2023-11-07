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

  appId: "1:384782570711:web:75165b43a0a2fa115dcc92",
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
const usersRef = collection(db, "users");

// let username = user.username;

// Sign In
async function googleSignIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
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

// googleSignIn()

// Sign Out
if (window.location.pathname == "/pages/profile.html") {
  document.getElementById("logOut").addEventListener("click", function (event) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  });
  document.getElementsByClassName(
    "profileContainer"
  ).innerHTML = `<h2>${username}</h2>`;
}

// Estado del usuario

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Logged user");
    console.log(user);
  } else {
    console.log("No logged user");
  }
});

// Pintar foto, nombre y usuario en Profile

// Función para obtener imagen random para el slider cada vez que se refresca la página - con Math Random
// if (window.location.pathname == "/pages/home.html") {
  // async function getSliderImg() {
  //   let id = Math.floor(Math.random() * 40000);
  //   try {
  //     let response2 = await fetch(
  //       `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  //     );
  //     let objectsImgData = await response2.json();
  //     let img = objectsImgData.primaryImage;
  //     let name = objectsImgData.title;
  //     document.getElementById("photoSlider").innerHTML = `<section>
  //         <img id="photoSlider" src="${img}" alt="${name}"
  //         <h1>${name}</h1>
  //         </section>`;
  //   } catch (error) {
  //     console.log("Error");
  //   }
  // }

  // getSliderImg();
  // }

  // Declaración de variables
  let arrayImagenes = [];
  let arrayNombres = [];

  async function getSliderImg() {
    try {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
      );
      if (!response.ok) {
        throw new Error(
          "Error al obtener los datos. Código de estado: " + response.status
        );
      }

      const data = await response.json();

      for (let i = 0; i < array.length; i++) {
        arrayImagenes.push(data.primaryImage);
        arrayNombres.push(data.title);
      }
      pintarImagenes();
    } catch (error) {
      console.log("Error");
    }
  }

async function pintarImagenes(i) {
  let template = `<section>
  //         <img id="photoSlider" src="${arrayImagenes[i]}" alt="${arrayNombres[i]}"
  //         <h1>${arrayNombres[i]}</h1>
  //         </section>`;
  document.getElementById(("searchContainer".innerHTML = template));
}

if (window.location.pathname == "/home.html") {
  getQuestionAndAnswers();}