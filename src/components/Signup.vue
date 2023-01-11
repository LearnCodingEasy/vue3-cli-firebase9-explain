<template>
  <div class="Page-signup">
    <!-- <LearnVueButton>Hello</LearnVueButton> -->
    <form class="signup" @submit.prevent="SignIn">
      <div class="email">
        <label for="email">email:</label>
        <input type="email" v-model="email" />
      </div>
      <div class="password">
        <label for="password">password:</label>
        <input type="password" v-model="password" />
      </div>
      <div class="displayName">
        <label for="displayName">displayName:</label>
        <input type="text" v-model="displayName" />
      </div>
      <div class="phoneNumber">
        <label for="phoneNumber">phoneNumber:</label>
        <input type="tel" v-model="phoneNumber" name="phoneNumber" />
      </div>
      <div class="Img">
        <label for="Img">GetImg:</label>
        <input type="text" v-model="Img" name="Img" />
      </div>
      <div class="role">
        <label>Role:</label>
        <select v-model="role">
          <option value="developer">Web Developer</option>
          <option value="designer">Web Designer</option>
        </select>
      </div>
      <div class="skills">
        <label>Skills (press alt + comma to add):</label>
        <input type="text" v-model="tempSkill" @keyup.alt="addSkill" />
        <div v-if="skills.length">
          <div v-for="skill in skills" :key="skill" class="pill">
            <span @click="deleteSkill(skill)">{{ skill }}</span>
          </div>
        </div>
      </div>
      <div class="btn">
        <button class="btn-primary btn-add">signup</button>
      </div>
    </form>

    <div class="user-info">
      <div class="wrapper-user" v-if="isLogin">
        <button class="btn-Logout" @click="signOut">Sign Out</button>
        <h4>{{ GetUserId }}</h4>
        <h4>{{ GetEmail }}</h4>
        <h4>{{ GetCreatedAt }}</h4>
        <h4>{{ GetDisplayName }}</h4>
        <h4>{{ GetPhoneNumber }}</h4>
        <h4>{{ GetRole }}</h4>
        <img :src="GetImg" alt="" style="width: 200px" />
        <div v-for="skill in GetSkills" :key="skill" class="pill">
          <span>{{ skill }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

// call Object from the Firebase to Initialize app
import { initializeApp } from "firebase/app";

// Import Auth
import { getAuth } from "firebase/auth";

// Import create User With Email And Password
import { createUserWithEmailAndPassword } from "firebase/auth";

// Import Object serverTimestamp
import { serverTimestamp } from "firebase/firestore";

// Import Data Base
import { getFirestore } from "firebase/firestore";

// Import Object Doc
import { doc } from "firebase/firestore";

// Import Object setDoc
import { setDoc } from "firebase/firestore";

// Import Data Of Collection
import { getDoc } from "firebase/firestore";

// Import on Auth State Changed
import { onAuthStateChanged } from "firebase/auth";

// Import sign Out
import { signOut } from "firebase/auth";

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
const Auth = getAuth();

export default {
  name: "Sign-up",
  data() {
    return {
      // I User Is Login
      isLogin: null,
      // Sand Data
      email: ``,
      password: "",
      displayName: "",
      phoneNumber: "",
      Img: "",
      role: "designer",
      skills: [],
      tempSkill: "",
      createdAt: null,
      // Get Data
      GetUserId: "",
      GetEmail: "",
      GetCreatedAt: "",
      GetDisplayName: "",
      GetPhoneNumber: "",
      GetImg: "",
      GetRole: "",
      GetSkills: [],
      // Get Data From Collection User By Uid
      userId: null,
    };
  },
  methods: {
    addSkill($event) {
      if ($event.key === "," && this.tempSkill) {
        if (!this.skills.includes(this.tempSkill)) {
          this.skills.push(this.tempSkill);
        }
        this.tempSkill = "";
      }
    },
    deleteSkill(skill) {
      this.skills = this.skills.filter((item) => {
        return skill !== item;
      });
    },
    SignIn() {
      const addUser = async (userId = null) => {
        const userRef = doc(Database, "users", userId);
        console.log("userRef: ", userRef);
        let dataToSend = {
          userId: userId,
          email: this.email,
          displayName: this.displayName,
          phoneNumber: this.phoneNumber,
          Img: this.Img,
          skills: this.skills,
          role: this.role,
          createdAt: this.createdAt,
        };
        return await setDoc(userRef, dataToSend);
      };
      createUserWithEmailAndPassword(Auth, this.email, this.password)
        .then((cred) => {
          this.$swal("User Adding 👦");
          console.log("cred: ", cred);
          let userData = cred.user;
          console.log("userData: ", userData);
          if (cred.user != " ") {
            addUser(
              userData.uid,
              userData.email,
              userData.displayName,
              userData.phoneNumber,
              (this.createdAt = serverTimestamp())
            );
          } else {
            console.log("User already exists");
            this.$swal("User already exists 👦");
          }
        })
        .then(() => {
          this.email = "";
          this.password = "";
          this.displayName = "";
          this.phoneNumber = "";
          this.Img = "";
          this.role = "";
          this.skills = [];
        })
        .catch((err) => {
          console.log(err.message);
          this.$swal("Error 👦", err.message);
        });
    },
    // signOut
    signOut() {
      signOut(Auth)
        .then(() => {
          console.log("user signed out");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  mounted() {
    this.isLogin = onAuthStateChanged(Auth, (user) => {
      //
      if (user != null) {
        // collection data
        const userRef = doc(Database, "users", user.uid);
        console.log("userRef: ", userRef);
        getDoc(userRef)
          .then((doc) => {
            this.GetUserId = doc.id;
            this.userInfo = doc.data();
            this.GetEmail = doc.data().email;
            this.GetCreatedAt = doc.data().createdAt;
            this.GetDisplayName = doc.data().displayName;
            this.GetPhoneNumber = doc.data().phoneNumber;
            this.GetImg = doc.data().Img;
            this.GetRole = doc.data().role;
            this.GetSkills = doc.data().skills;
          })
          .then(() => {});
      } else {
        this.$swal(" Please Signup : 👦");
      }
    });
  },
};
</script>

<style scoped>
form {
  max-width: 80%;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
  grid-gap: 2% 4%;
  justify-content: center;
  align-items: center;
  border: 0.5rem solid rgb(83, 68, 68);
}
label {
  color: rgba(51, 51, 51, 0.661);
  display: inline-block;
  margin: 15px 0 15px;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin: 20px auto;
  color: white;
  border-radius: 5px;
  display: block;
}
.submit {
  text-align: center;
}
.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
