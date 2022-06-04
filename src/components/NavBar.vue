<template>
  <v-bottom-navigation
    v-model="value"
    :background-color="color"
    dark
    shift
    class="pt-2"
  >
    <v-btn to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/prestamos">
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>

    <v-btn @click="cerrarSesion" v-if="!usuario.nombre==''">
      <v-icon>mdi-power</v-icon>
    </v-btn>

    <v-btn to="/login" v-else>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({ value: 1 }),

  computed: {
    ...mapState(['usuario']),
    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
  
};
</script>