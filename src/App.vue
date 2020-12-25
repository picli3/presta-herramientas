<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />

      <v-fab-transition v-if="!foto == ''">
        <v-btn fab dark fixed bottom right color="none">
          <v-avatar right size="58">
            <img :src="foto" />
          </v-avatar>
        </v-btn>
      </v-fab-transition>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { auth } from "@/firebase";
export default {
  name: "App",

  components: {
    NavBar,
  },

  data: () => ({
    foto: "",
  }),
  created() {
    const user = auth.currentUser;
    if (user !== null) {
      this.foto = user.photoURL;
    }
  },
};
</script>
