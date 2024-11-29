<script setup>
import { ref, computed } from "vue";
import MuzartDetails from "./MuzartDetails.vue";
import MuzartHeader from "./MuzartHeader.vue";

import MuzartListusers from "./MuzartListusers.vue";

let search = ref('');
let searchduration = ref(0);
let recupVar = ref(0);
let AlbumList = ref([]); // Liste complète des albums
// let currentTime = ref(0); // Temps actuel

const url = '/src/components/albums/albums.json';

async function fetchAlbum() {
    const fetchResponse = await fetch(url);
    AlbumList.value = await fetchResponse.json();
    console.log(AlbumList.value);
}

fetchAlbum();

let id = function recupId(index) {
    return index;
}

// Variables pour gérer la pagination
const currentPage = ref(1);
const itemsPerPage = 3;

// je Calcule les articles à afficher sur la page
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  
  // Si l'utilisateur fait une recherche, les résultats sont filtrés
  if (search.value !== '') {
    return AlbumList.value.filter(item => {
      return search.value.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v));
    });
  } else {
    // Retourner les articles paginés et filtrés lorsque l'utilisateur fait une recherche
    return AlbumList.value.slice(start, end);
  }
});

// Calculer le nombre total de pages
const totalPages = computed(() => {
  if (search.value !== '') {
    return Math.ceil(AlbumList.value.filter(item => {
      return search.value.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v));
    }).length / itemsPerPage);
  } else {
    return Math.ceil(AlbumList.value.length / itemsPerPage);
  }
});

// Fonction pour changer de page
function changePage(page) {
  currentPage.value = page;
}

let MyDetailsfunction = AlbumList.value.id;


</script>

<template>
  <div>
    <MuzartHeader @recherche="(f) => { search = f; }"></MuzartHeader>
    
    <div class="listdetail">
        <MuzartDetails 
            v-if="recupVar" 
            :ListDetails="AlbumList" 
            :Num="id(recupVar)" 
            @durationevent="(g) => { searchduration = g; }" 
           
        ></MuzartDetails>
      
        <!-- Envoyer les données paginées et la pagination au composant enfant -->
        <MuzartListusers 
            :MyDetailsFunction="MyDetailsfunction"
            :tab="AlbumList"
            :currentPage="currentPage"
            :totalPages="totalPages"
            :changePage="changePage"
            :List="paginatedData"
            @theId="(k) => { recupVar = k; }"
        ></MuzartListusers>
    </div>
    <RouterView></RouterView>
  </div>
</template>
<style >


@font-face {
  font-family: "Montserrat-Regular.ttf";
  src:
    local("Montserrat-Regular.ttf"),
    url("./montserratFont/Montserrat-Regular.ttf") 
}

div {
    font-family: "Montserrat-Regular.ttf";
    color: rgb(0, 0, 0);
}

.listdetail {
    display: flex;
}

button {
    font-family: "Montserrat-Regular.ttf";
    border-radius: 20px;
    background-color: rgba(240, 248, 255, 0);
    border-color: rgb(223, 43, 226);
}

</style>