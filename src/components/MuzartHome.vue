<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MuzartDetails from './MuzartDetails.vue'
import MuzartHeader from './MuzartHeader.vue'
import MuzartList from './MuzartList.vue'
import ModifComponent from './ModifComponent.vue'

let idadd = 10
let duration = ref(0)
let reference = ref('')
let nom = ref('')
let titre = ref('')
let description = ref('')
let tags = ref('')
let route = useRoute()
let userId = ref('')
let search = ref('')
let searchduration = ref(0)
let recupVar = ref(0)
let AlbumList = ref([]) // Liste complète des albums
// let currentTime = ref(0); // Temps actuel

let NomModif = ref('')
let ReferenceModif = ref('')
let TitreModif = ref('')
let DescriptionModif = ref('')
let TagsModif = ref('')
let DurationModif = ref('')
let varObject = ref(0)
let loading = ref('')
let loadingdetails = ref('')
let loadAdd = ref(true)

const url = '/src/components/albums/albums.json'

async function fetchAlbum() {
  const fetchResponse = await fetch(url)
  AlbumList.value = await fetchResponse.json()
  console.log(AlbumList.value)
}

fetchAlbum()

let id = function recupId(index) {
  return index
}

// Variables pour gérer la pagination
const currentPage = ref(1)
const itemsPerPage = 2

// je Calcule les articles à afficher sur la page
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage

  // Si l'utilisateur fait une recherche, les résultats sont filtrés
  if (search.value !== '') {
    return AlbumList.value.filter((item) => {
      return search.value
        .toLowerCase()
        .split(' ')
        .every((v) => item.name.toLowerCase().includes(v))
    })
  } else {
    // Retourner les articles paginés et filtrés lorsque l'utilisateur fait une recherche
    return AlbumList.value.slice(start, end)
  }
})

// Calculer le nombre total de pages
const totalPages = computed(() => {
  if (search.value !== '') {
    return Math.ceil(
      AlbumList.value.filter((item) => {
        return search.value
          .toLowerCase()
          .split(' ')
          .every((v) => item.name.toLowerCase().includes(v))
      }).length / itemsPerPage
    )
  } else {
    return Math.ceil(AlbumList.value.length / itemsPerPage)
  }
})

// Fonction pour changer de page
function changePage(page) {
  currentPage.value = page
}

onMounted(() => {
  userId.value = route.params.id
})

let MyDetailsfunction = AlbumList.value.id

function addAlbum() {
  loadAdd.value = !loadAdd.value

  tags.value = tags.value.split(',')

  AlbumList.value.push({
    id: idadd++,
    ref: reference.value,
    name: nom.value,
    title: titre.value,
    description: description.value,
    tags: tags.value,
    duration: duration.value
  })

  duration.value = ''
  reference.value = ''
  nom.value = ''
  titre.value = ''
  description.value = ''
  tags.value = ''
}

function removeAlbum(albumremoved) {
  AlbumList.value = AlbumList.value.filter((elremove) => elremove !== albumremoved)
  let confirm = window.confirm('Voulez vous vraiment supprimez cette album ?')
  if (!confirm) return false
}
function ModifAlbum() {
  TagsModif.value = TagsModif.value.split(',')

  paginatedData.value[varObject.value].ref = ReferenceModif
  paginatedData.value[varObject.value].name = NomModif
  paginatedData.value[varObject.value].title = TitreModif
  paginatedData.value[varObject.value].description = DescriptionModif
  paginatedData.value[varObject.value].tags = TagsModif
  paginatedData.value[varObject.value].duration = DurationModif
}

console.log(loading.value)
</script>

<template>
  <div>
    <MuzartHeader
      @recherche="
        (f) => {
          search = f
        }
      "
    ></MuzartHeader>
   <div class="body">
    <H1
      >Bienvenue <span class="bienvenue">{{ userId }}</span
      >, tu peux faire des ajouts d'albums, les supprimer, ou les modifier :</H1
    >
    
    <form class="addForm" action="" @submit.prevent="addAlbum">
      <button v-if="loadAdd" class="butAddfirst">Ajouter un album en cliquant ici</button>
      <div v-else class="addDormDiv">
        <H2>Veuillez Ajouter vos élements :</H2>
        <input
        type="text" class="inputAdd"
        required
        placeholder="référence(ex : rock, Jazz)"
        v-model="reference"
      /><br>
      <input type="text" class="inputAdd" required placeholder="Entrez le nom de l'artiste" v-model="nom" /><br>
      <input type="text"  class="inputAdd" required placeholder="Entrez le titre de l'album" v-model="titre" /><br>
      <input type="text" class="inputAdd" required placeholder="Entrez une description" v-model="description" /><br>
      <input
        type="text" class="inputAdd"
        required
        placeholder="entrez les titres, et separez les par des virgules"
        v-model="tags"
      /><br>
      <input type="text" class="inputAdd" required placeholder="Entrez la durée de l'abum" v-model="duration" /><br>
      <button v-if="!loadAdd" class="butAddfirst">ajouter un album</button>
      </div>
    </form>
    <div class="listdetail">
      <MuzartDetails
        :ListDetails="paginatedData"
        :Num="id(recupVar)"
        @durationevent="
          (g) => {
            searchduration = g
          }
        "
        :loading="loadingdetails"
      ></MuzartDetails>

      <!-- Envoyer les données paginées et la pagination au composant enfant -->
      <MuzartList
        :-myFunctionRemove="removeAlbum"
        :MyDetailsFunction="MyDetailsfunction"
        :tab="AlbumList"
        :currentPage="currentPage"
        :reference="reference"
        :titre="titre"
        :description="description"
        :tags="tags"
        :totalPages="totalPages"
        :changePage="changePage"
        :List="paginatedData"
        @theId="
          (k) => {
            recupVar = k
          }
        "
        @modify="
          (v) => {
            varObject = v
          }
        "
        @loadingModif="
          (lo) => {
            loading = lo
          }
        "
        @loadDetails="(lod) => (loadingdetails = lod)"
      ></MuzartList>
      <ModifComponent
        @modif="
          (N, R, Ti, De, Ta, Du) => {
            NomModif = N
            ReferenceModif = R
            TitreModif = Ti
            DescriptionModif = De
            TagsModif = Ta
            DurationModif = Du
          }
        "
        :Modifier="ModifAlbum"
        :loadingM="loading"
      ></ModifComponent>
    </div>
    <RouterView></RouterView>
   </div>
  </div>
</template>
<style>
.body {
  width: 90%;
  margin: auto;
}
@font-face {
  font-family: 'Montserrat-Regular.ttf';
  src: local('Montserrat-Regular.ttf'), url('./montserratFont/Montserrat-Regular.ttf');
}
@font-face {
  font-family: 'Montserrat-ExtraBold.ttf';
  src: local('Montserrat-ExtraBold.ttf'), url('./montserratFont/Montserrat-ExtraBold.ttf');
}

.addForm{
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.addDormDiv{
  border: 1px solid rgb(195, 0, 255);
  width: 25%;
  border-radius: 20px;
  padding : 20px;
  box-shadow: 1px 1px 10px 1px rgb(150, 150, 150);
}

.inputAdd {
  padding : 10px;
  margin: 10px;
  
 
  border-radius: 20px;
}

.butAddfirst {
  padding : 10px;
  box-shadow: 1px 1px 10px 1px rgb(150, 150, 150);
  margin-block: 20px;
  

}

.bienvenue {
  font-family: 'Montserrat-ExtraBold.ttf';
}

div {
  font-family: 'Montserrat-Regular.ttf';
  color: rgb(0, 0, 0);
}

.listdetail {
  display: flex;
}

button {
  font-family: 'Montserrat-Regular.ttf';
  border-radius: 20px;
  background-color: rgba(240, 248, 255, 0);
  border-color: rgb(223, 43, 226);
  padding: 10px;
}
</style>
