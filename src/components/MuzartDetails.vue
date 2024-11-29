<script setup>
import { ref, onMounted } from 'vue';

defineProps({
    loading: Boolean,
    ListDetails: Object,
    Num: Number
});

const isPlaying = ref(false);
const isPlaying1 = ref(false);
const progress = ref(0);
const intervalId = ref(null);

// Fonction pour démarrer la barre de chargement
const startProgress = () => {
    if (intervalId.value) clearInterval(intervalId.value); // Si la musique est relancée

    const duration =  2000; // Durée de la chanson
    isPlaying.value = true;
    progress.value = 0;

    intervalId.value = setInterval(() => {
        progress.value += (100 / duration); // Mise à jour de la barre de chargement
        if (progress.value >= 100) {
            clearInterval(intervalId.value);
            progress.value = 100;
            isPlaying.value = false;
        }
    }, 1000); // Mise à jour toutes les secondes
};
isPlaying1.value = true;

// Fonction pour arrêter la musique et la barre de progression
const stopProgress = () => {
    clearInterval(intervalId.value);
    // progress.value = 0;
    isPlaying1.value = false;
};

// Nettoyer lorsque le composant est démonté
onMounted(() => {
    return () => clearInterval(intervalId.value);
});
</script>

<template>
<div class="details" v-if="!loading">
    <img class="imgdetail" src="https://unsplash.it/300/300" alt="">
    <p class="title">{{ ListDetails[Num]?.title }}</p>
    <p>nom : <b>{{ ListDetails[Num]?.name }}</b></p>
    
    <button class="jouer" @click="startProgress" :disabled="isPlaying">
        {{ isPlaying ? 'Lecture en cours...' : 'Jouer' }}
        
    </button>
    <button class="jouer" @click="stopProgress" :disabled="isPlaying1">
        pause
    </button>

    <!-- Barre de progression -->
    <div class="progress-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>

    <p class="Songlist">Liste des chansons</p>
    <ul>
        <li class="music" v-for="(tags, i) in ListDetails[Num]?.tags" :key="i">{{ ListDetails[Num]?.tags[i] }}</li>
    </ul>
</div>
</template>

<style>
.jouer {
    background-color: blueviolet;
    border: 1px solid black;
    padding: 10px;
    color: white;
    border-radius: 20px;
    font-size: 1em;
    width: 100px;
    cursor: pointer;
}

.music {
    font-weight: bold;
    color: rgb(0, 0, 0);
    text-align: left;
    list-style-type: disc;
}

.title {
    font-size: 3em;
    font-weight: bold;
}

.details {
    width: 20%;
    margin: 20px;
    border: 1px solid rgb(195, 0, 255);
    padding: 20px;
    border-radius: 20px;
    box-shadow: 1px 1px 10px 2px rgb(155, 154, 154);
    max-height: 700px;
    text-align: center;
   
    color: black;
}

.Songlist {
    border: 1px solid rgb(195, 0, 255);
    border-radius: 20px;
    padding: 10px;
}

.imgdetail {
    box-shadow: 1px 1px 10px 2px rgb(155, 154, 154);
    border-radius: 20px;
    width: 50%;
}

/* Style de la barre de progression */
.progress-container {
    margin-top: 20px;
    width: 100%;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: inset 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
}

.progress-bar {
    height: 100%;
    background-color: rgb(0, 255, 127);
    border-radius: 10px;
    transition: width 1s ease;
}
</style>
