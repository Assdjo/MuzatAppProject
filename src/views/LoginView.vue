<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendUser } from '../utiles'
let recommence = ref(false)
let email = ref('')
let password = ref('')
// creation d'une instance de vue routeur

// let isAuthenticatedvar = false;

// isAuthenticated.value.json()
// console.log(isAuthenticated.value);

const routerLogin = useRouter()

console.log(routerLogin);


const url = '/src/ressource/user-data.json'
let tab = ref([])
const user = ref('')

//fonction qui recupères les donnéss des utilisateurs
async function Myfetchfunction() {
  try {
    let fetchvar = await fetch(url)
    tab.value = await fetchvar.json()
    console.log(tab.value)
  } catch (error) {
    console.log(error)
  }
}

// router.beforeEach(async (to, from) => {
//   if (
//     // make sure the user is authenticated
//     isAuthenticated.value &&
//       // ❗️ Avoid an infinite redirect
//       to.path !== '/'
//   ) {
//     // redirect the user to the login page
//     return  {path : '/'}
//   }
// })


onMounted(()=>Myfetchfunction())

 function connectUser() {
 

  console.log(tab.value)
  user.value = tab.value.filter((el) => el.email == email.value)
  console.log(user.value)
  if (user.value.length > 0) {
    if (password.value == user.value[0].password) {
      if (user.value[0].isadmin == true) {
        sendUser(user.value[0])
        console.log('connexion reussie, vous pouvez commencer les modifs')
        routerLogin.push(`/home/${user.value[0].nom}`)
      } else {
        sendUser(user.value[0])
        console.log('connexion reussie, vous etes un Agent')
        routerLogin.push(`/homeusers/${user.value[0].nom}`)
      }
    } else {
      recommence.value = true
    }
  }
}

function MySubmitFunc() {
  connectUser()
  console.log(email.value)
  console.log(password.value)
  email.value = ''
  password.value = ''
}
</script>

<template>
  <div class="formulaire">
    <form action="" class="connexionForm" @submit.prevent="MySubmitFunc">
      <div class="connexion">
        <img class="personneIC" src="../components/MuzartImg/user.png" alt="" /><br />
        <!-- <div class="emailDiv">  -->
        <img class="userImg" src="../components/MuzartImg/utilisateur (1).png" alt="" />
        <input class="email" type="text" required placeholder="EMAIL ID" v-model="email" /><br />
        <!-- </div> -->
        <img src="../components/MuzartImg/cadenas.png" class="cadenas" alt="" />
        <input
          required
          class="password"
          type="password"
          placeholder="PASSWORD"
          v-model="password"
        /><br />
        <div class="remenberDiv">
          <div>
            <input class="remember" type="checkbox" /><span class="rememberT">remember me</span>
          </div>
          <p class="forgot">forgot password ?</p>
        </div>
        <p v-if="recommence">Mot de passe incorrect, veuillez ressayez s'il vous plait !</p>
      </div>
      <div class="buttonFlex">
        <div class="buttonDiv">
          <button class="buttonLo">LOGIN</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
@font-face {
  font-family: 'Montserrat-Regular.ttf';
  src: local('Montserrat-Regular.ttf'), url('../components/montserratFont/Montserrat-Regular.ttf');
}

.formulaire {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat-Regular.ttf';
  color: rgb(0, 0, 0);
  text-align: center;
  background-image: url(../components/MuzartImg/HD-wallpaper-gradient-multicolored-color-abstraction-background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
}

.listdetail {
  display: flex;
}

.email,
.password {
  font-family: 'Montserrat-Regular.ttf';
  /* margin-block: 3px; */
  background-color: rgb(57 81 115);
  padding: 10px;
  width: 70%;
  color: white;
  border: 0px solid;
  height: 12%;
  /* font-size: 1em; */
}

.email {
  margin-top: 80px;
}

.cadenas {
  background-color: rgb(0 38 77);
  width: 32px;
  position: relative;
  top: 31px;
  padding: 20px;
}
.userImg {
  background-color: rgb(0 38 77);
  width: 32px;
  position: relative;
  top: 31px;
  padding: 20px;
}

.buttonLo {
  font-family: 'Montserrat-Regular.ttf';
  border-radius: 20px;
  background-color: rgba(240, 248, 255, 0);
  margin: 10px;
  border: 0px solid rgb(223, 43, 226);
  color: white;
  font-family: 'Montserrat-Bold';
}
.personneIC {
  position: absolute;
  width: 150px;
  bottom: 430px;
  right: 220px;
}

.connexion {
  position: relative;
  background-color: rgba(247, 246, 246, 0.5);
  border-radius: 60px;
  padding: 0px;
  width: 100%;
  padding: 30px;
  height: 45vh;
  /* box-shadow:  1px 1px 10px 1px rgb(105, 105, 105); */
}

.connexionForm {
  /* background-color: rgba(255, 255, 255, 0.788); */
  border-radius: 20px;

  width: 30vw;

  height: 60vh;
  text-align: center;
}

.emailDiv {
  margin-bottom: 20px;
}

.remember {
  background-color: rgb(57 81 115);
}

.email::placeholder,
.password::placeholder {
  color: rgba(255, 255, 255, 0.582);
  font-size: 2em;
}

.rememberT {
  font-size: 0.8em;
}

.forgot {
  font-size: 0.8em;
  margin: 0;
}

.remenberDiv {
  display: flex;
  justify-content: space-between;
  margin-top: 15%;
  margin-inline: 9%;
  font-family: 'Montserrat-Italic';
  color: rgb(57 81 115);
}

@font-face {
  font-family: 'Montserrat-Italic';
  src: local('Montserrat-ExtraBold.ttf'), url('../components/montserratFont/Montserrat-Italic.ttf');
}

.buttonFlex {
  display: flex;
  justify-content: center;
}

.buttonDiv {
  background: linear-gradient(to top, rgba(247, 246, 246, 0.5) 50%, rgba(255, 255, 255, 0));
  width: 70%;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin-left: 60px;
  padding: 10px;
  font-family: 'Montserrat-Bold';
}

@font-face {
  font-family: 'Montserrat-Bold';
  src: local('Montserrat-ExtraBold.ttf'), url('../components/montserratFont/Montserrat-Bold.ttf');
}
</style>
