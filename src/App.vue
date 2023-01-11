<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/Contact">Contact</router-link>
    |
    <div v-for="user in users" :key="user.id">
      <router-link to="{ name: 'Profile' }">user</router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
// call Object from the Firebase to Initialize app
import { initializeApp } from "firebase/app";

// Import Auth
// import { getAuth } from "firebase/auth";

// Import Data Base
import { getFirestore } from "firebase/firestore";

// Import Collection
// import { collection } from "firebase/firestore";

// Import Object onSnapshot
// import { onSnapshot } from "firebase/firestore";

// Import Object Doc
import { doc } from "firebase/firestore";

// Import Data Of Collection
import { getDoc } from "firebase/firestore";

// Import on Auth State Changed
// import { onAuthStateChanged } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO-FYsh5Ms_zDw315IHOAdjLG90PUAvdA",
  authDomain: "fir-9-22da7.firebaseapp.com",
  projectId: "fir-9-22da7",
  storageBucket: "fir-9-22da7.appspot.com",
  messagingSenderId: "182116649786",
  appId: "1:182116649786:web:b03d5eb5e751e17fc1de03",
  measurementId: "G-1G24BFPF7R",
};

// initialize firebase App
initializeApp(firebaseConfig);

//! init services ( Database )
const Database = getFirestore();

// Call Object From The Firebase To Initialize Services ( Auth )
// const Auth = getAuth();

export default {
  data() {
    return {
      userId: null,
    };
  },
  // mounted() {
  //   // Get The Collection From Database by Collection Name
  //   // collection ref
  //   const colRef = collection(Database, "users");
  //   // Fetching Data
  //   getDoc(colRef)
  //     .then((snapshot) => {
  //       console.log("snapshot: ", snapshot.docs);
  //       let movies = [];
  //       snapshot.docs.forEach((doc) => {
  //         movies.push({ ...doc.data(), id: doc.id });
  //         this.userId = doc.id;
  //         console.log("this.userId: ", this.userId);
  //       });
  //       console.log("movies: ", movies);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // },
  mounted() {
    // fetching a single document
    const docRef = doc(Database, "users", "1M2qJZIxL8S2fDgAWRUSsuMNXIn2");

    getDoc(docRef).then((doc) => {
      console.log(doc.data(), doc.id);
      this.userId = doc.id;
      console.log("doc.id: ", doc.id);
      console.log("this.userId: ", this.userId);
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
