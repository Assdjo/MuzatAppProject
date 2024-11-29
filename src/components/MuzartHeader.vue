<script setup>
// import router from '@/routes';
import { deleteUser } from '@/utiles';
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router';

// let route = useRouter()

// let isAuthenticated = ref(window.localStorage.getItem("auth"))


let hour = ref(0)
let min = ref(0)
let sec = ref(0)
let isAuthenticated = false
function deconnexion() {

  deleteUser()

  
}

onMounted(() => {
  

  setInterval(() => {
    sec.value++
    if (sec.value > 60) {
      sec.value = 0
      min.value++
    }
    if (min.value > 60) {
      min.value = 0
      hour.value++
    }
  }, 1000)
})


let searchQuery = ref('')

let emit = defineEmits(['recherche'])

function MySearchFunction() {
emit('recherche', searchQuery.value)
  
}
</script>

<template>
  <div>
    <header class="header1">
      <nav>
        <p class="logo">Muzart</p>
        <p>Home</p>
        <RouterLink class="deconnexion" :to="`/`" @click="deconnexion()">Déconnexion</RouterLink>
        
      </nav>
      <p class="duree">{{ hour }} : {{ min }} : {{ sec }}</p>
    </header>
   

    <img class="imgentete" src="./MuzartImg/MuzartEntete.jpg" alt="" />


    <div class="muzartDiv">
      <span class="textfondM1">M</span><span class="textfondU">U</span><span class="textfondZ">Z</span
    ><span class="textfondA">A</span><span class="textfondR">R</span
    ><span class="textfondT">T</span>
    </div>
    <form class="searchDiv" @submit.prevent="MySearchFunction">
      <input class="SearchBar" type="text" v-model="searchQuery" />
      <button class="searchButton" type="submit" placeholder="Entrez le mot clé" >Search</button>
     
    </form >
    <RouterView></RouterView>
  </div>
</template>

<style MuzartHeader>

@font-face {
  font-family: "Montserrat-Bold";
  src:
    local("Montserrat-ExtraBold.ttf"),
    url("../components/montserratFont/Montserrat-Bold.ttf") 
}

.deconnexion {
  font-family: "Montserrat-Bold";
  text-decoration: none;
  color: #ffffff;
}

.header1{
  position: fixed;
}
.logo {
  font-size: 2em;
  font-family: fantasy;
}

.muzartDiv {
  display: flex;
  justify-content: center;
  margin-block: 40px;
}

.textfondM1 {
  padding: 20px;
  /* position: absolute;
  left: 18vw;
  top: 40vh; */
  font-size: 10em;
  margin:40px;
  margin-block: 100px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  box-shadow: 1px 3px 10px 0.5px rgb(22, 22, 22);
  background-color: rgba(255, 255, 255, 0.7);
  color: rgb(170, 12, 255);
  border-radius: 20px;
  transition: font-size 4s;
  height: 20vh;
}
.textfondU {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  /* position: absolute;
  left: 30vw;
  top: 40vh; */
  font-size: 10em;
  margin:40px;
  margin-block: 100px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  box-shadow: 1px 3px 20px 2px rgb(22, 22, 22);
  color: rgb(255, 0, 230);
  border-radius: 20px;
  transition: font-size 4s;
  height: 20vh;
}

.textfondZ {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  /* position: absolute;
  left: 40vw;
  top: 40vh; */
  font-size: 10em;
  margin:40px;
  margin-block: 100px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  box-shadow: 1px 3px 10px 0.5px rgb(22, 22, 22);
  color: rgb(0, 195, 255);
  border-radius: 20px;
  transition: font-size 4s;
  height: 20vh;
}

.textfondA {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  /* position: absolute;
  left: 50vw;
  top: 40vh; */
  font-size: 10em;
  margin:40px;
  margin-block: 100px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  box-shadow: 1px 3px 10px 0.5px rgb(22, 22, 22);
  color: rgb(0, 255, 225);
  border-radius: 20px;
  transition: font-size 4s;
  height: 20vh;
}

.textfondR {
  background-color: rgba(255, 255, 255, 0.7);

  padding: 20px;
  /* position: absolute;
  left: 60vw;
  top: 40vh; */
  font-size: 10em;
  margin:40px;
  margin-block: 100px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  box-shadow: 1px 3px 10px 0.5px rgb(22, 22, 22);
  color: rgb(47, 0, 255);
  border-radius: 20px;
  transition: font-size 4s;
  height: 20vh;
}

.textfondT {
  padding: 20px;
  /* position: absolute;
  left: 70vw;
  top: 40vh; */
  font-size: 10em;
  margin:40px;
  margin-block: 100px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  box-shadow: 1px 3px 10px 0.5px rgb(22, 22, 22);
  color: rgb(255, 200, 0);
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  transition: font-size 4s;
  height: 20vh;
}

/* .textfondM1:hover,
.textfondU:hover,
.textfondZ:hover,
.textfondA:hover,
.textfondR:hover,
.textfondT:hover {
  font-size: 15em;
} */

.searchDiv {
  text-align: center;
}
.SearchBar {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: 1px 3px 10px 0.5px rgb(201, 201, 201);
  width: 20%;
  margin: 20px;
  height: 50px;
  color: #000000;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 20px;
  padding-inline: 20px;
}

.searchButton {
  background-color: rgba(137, 43, 226, 0);
  border-color: rgb(0, 0, 0);
  border-radius: 20px;
  color: #000000;
  height: 50px;
  width: 120px;
}

header {
  display: flex;
  justify-content: space-between;
}

header > p {
  width: 20vw;
  text-align: center;
  padding-top: 20px;
  color: #ffffff;
}

nav {
  display: flex;
  background-color: blueviolet;
  width: 80vw;
  align-items: center;
}

.duree {
  margin: 0px;
  background-color: blueviolet;
}

nav p {
  margin: 0px;
  padding: 10px;
  color: #ffffff;
}

.imgentete {
  width: 100vw;
  height: 100%;
}
</style>
