<template>
  <v-container>
    <Buscar texto="Buscar" />
    <Tools />
    <v-fab-transition v-if="usuario.admin==1">
      <v-btn
        v-show="!hidden"
        color="success"
        fab
        dark
        absolute
        top
        left
        to="/agregar"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import Buscar from "../components/Buscar";
import Tools from "../components/Tools";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Buscar,
    Tools,
  },
  data() {
    return {
      hidden: false,
    };
  },
  computed: {
    ...mapState(['usuario'])
  },

};
</script>
