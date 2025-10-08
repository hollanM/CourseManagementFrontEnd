<script setup>
import ocLogo from "/ocLogoWhiteText.png";
import { ref, onMounted } from "vue";



const name = ref("");
const logoURL = ref("");

onMounted(() => {
  logoURL.value = ocLogo;
 
});
</script>

<template>
  <div>
    <v-app-bar app style="background-color: #7A0019;">
      <router-link :to="{ name: 'home' }">
        <v-img
          class="mx-2"
          :src="logoURL"
          height="50"
          width="50"
          contain
        ></v-img>
      </router-link>
      <v-toolbar-title style="color: white;" class="title">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div >
        <v-btn class="mx-2 text-white" :to="{ name: 'courses' }"> List </v-btn>
        <v-btn class="mx-2 text-white" :to="{ name: 'add' }"> Add Course </v-btn>
      </div>

    </v-app-bar>
  </div>
</template>
