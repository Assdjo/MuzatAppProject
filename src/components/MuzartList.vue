<script setup>
import { ref, watch } from 'vue';

// import { ref } from 'vue';

// Recevoir les propriétés List et pagination
defineProps({
  MyDetailsFunction : Function,
  tab: Array,
  List: Array, // Les articles paginés
  currentPage: Number,
  totalPages: Number,
  changePage: Function, // Fonction pour changer de page
  reference : String,
  titre : String,
  description : String,
  tags : String,
  MyFunctionRemove: Function,
  
})

let loading = ref(false)
let loadingdetails = ref(false)

const emit = defineEmits(['theId', 'modify', 'loadingModif', 'loadDetails'])

// Fonction pour gérer le clic sur les détails
function MyFunctionId(index) {
  emit('theId', index)

  loadingdetails.value = !loadingdetails.value
  watch(loadingdetails, ()=>{
    emit('loadDetails', loadingdetails.value)
  })
  
}

function MyFunctionModifier(id) {
  emit('modify', id)
  
  loading.value = !loading.value

  watch(loading, ()=>{
    emit('loadingModif', loading.value)
  })

}

// function removeAlbum(albumremoved) {
//   List.value.filter(elremove => elremove !== albumremoved)
//   // let confirm = window.confirm('Voulez vous vraiment supprimez cette album ?')
//   // if (!confirm) return false;
// }
// let indextab = ref(0)
</script>

<template>
  <div class="totalList">
    <div>
    <div class="albumlist">
    <!-- Affichage des articles paginés envoyés par le parent -->
    <div class="album" v-for="(item, index) in List" :key="index">
      <img class="cassette" src="https://unsplash.it/300/300" alt="" />
      <p class="ref">{{ item.ref }}</p>
      <p class="name">{{ item.name }}</p>
      <p class="description">{{ item.description }}</p>
      <!-- <div class="tags">
        <p v-for="(tag, i) in item.tags" :key="i">{{ tag }}</p>
      </div> -->
      <div class="muzartlistfooter">
        <button>fr</button>
        <img class="icone" src="./MuzartImg/heart.png" alt="" />
        <p>5</p>
        <img class="icone" src="./MuzartImg/stopwatch.png" alt="" />
        <p>{{ item.duration }} minutes</p>
        <div >
          <button @click="MyFunctionId(index)">Détails</button>
        </div>
        <div >
          <button @click="(MyFunctionRemove(item))">supprimer</button>
        </div>
        <div >
          <button @click="(MyFunctionModifier(index))">modifier</button>
        </div>
      </div>
    </div>


  </div>
      <!-- Pagination Controls -->
    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
  </div>
</template>

<style scoped>
.totalList {
  display: flex;
  justify-content: center;
  /* margin-left: 10%; */
  margin-bottom: 20px ;
}
.albumlist{
  display: flex;
  justify-content: center
}
.description{
  /* position: absolute; */
  width: 15vw
}

.albumlist p {
  font-size: 0.8em;
}

.cassette {
  width: 100%;
  border-radius: 20px;
}

.album {
  
  width: 30%;
  margin: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid rgb(195, 0, 255);
  box-shadow: 1px 1px 10px 2px rgb(155, 154, 154);
  /* max-height: 800px; */
}

.ref {
  background-color: blueviolet;
  padding: 10px;
  border-radius: 10px;
  color: white;
}

.name {
  font-size: 1.5em;
  margin-block: 10px;
  font-weight: bold;
  color: black;
}

.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  height: 170px;
  margin-top: 170px;
}

.tags p {
  background-color: blueviolet;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
  max-height: 15px
}

.muzartlistfooter {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.icone {
  width: 30px;
  height: 30px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 5px;
  background-color: blueviolet;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button.active {
  background-color: rgb(195, 0, 255);
}
</style>
