<script setup>
import { ref } from 'vue';

let props = defineProps({
    Modifier : Function,
    loadingM : Boolean
})

console.log(props.loadingM)



let Nom = ref('') 
let Reference = ref('')                   
let Titre = ref('') 
let Description = ref('') 
let Tags = ref('') 
let Duration = ref('') 
let emit = defineEmits(['modif'])

function modifFunc() {
    
    emit('modif',Nom, Reference, Titre, Description, Tags, Duration)
    props.Modifier()
}

</script>

<template>
  <div v-if="!loadingM">
    <form class="modiform" action="" @submit.prevent="modifFunc">
        <h2>Entrez les nouvelles données :</h2>
      <input
        type="text" class="inputmodif"
        required
        placeholder="Ajouter une référence(ex : rock, hard rock)"
        v-model="Reference"
      /><br>
      <input type="text" class="inputmodif" required placeholder="Entrez le nom de l'artiste" v-model="Nom" /><br>
      <input type="text" class="inputmodif" required placeholder="Entrez le titre de l'album" v-model="Titre" /><br>
      <input type="text" class="inputmodif" required placeholder="Entrez une description" v-model="Description" /><br>
      <input
        type="text" class="inputmodif"
        required
        placeholder="Entrez des tags et separez les par des espaces"
        v-model="Tags"
      /><br>
      <input type="text" class="inputmodif" required placeholder="Entrez la durée de l'abum" v-model="Duration" />
      <button class="mod">Modifier un album</button>
    </form>
  </div>
</template>

<style>
    .inputmodif{
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
        font-family: "Montserrat-Regular.ttf";

    }

    .modiform {
        margin-right: 150px;
        border: 1px solid rgb(195, 0, 255);
        padding: 20px;
        border-radius:20px;
        text-align: center;
  box-shadow: 1px 1px 10px 2px rgb(155, 154, 154);

    }
    .mod {
        padding: 10px;
        box-shadow: 1px 1px 10px 1px;
        margin: 10px;
    }
    .mod:active {
        
        background-color: blueviolet;
        color: white;
        box-shadow: 1px 1px 10px 1px rgb(116, 115, 115);

    }
</style>
