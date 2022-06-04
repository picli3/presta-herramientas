<template>
  <v-card>
    <v-container>
      <v-row dense>
        <v-col
          cols="12"
          v-for="(herramienta, index) in herramientas"
          :key="index"
        >
          <v-card :disabled="herramienta.cantidad===0">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">
                  {{ herramienta.nombre }}</v-card-title
                >
                <v-card-subtitle>Disponibles:</v-card-subtitle>
                <v-card-text class="display-1 ml-5 font-weight-black" v-text="herramienta.cantidad>0?herramienta.cantidad :'Agotado'">
                </v-card-text>
                <v-card-actions class="ml-2 mt-3">
                  <v-btn
                    class="ml-2 mt-5"
                    rounded
                    color="error"
                    elevation="4"
                    @click="eliminarHerramienta(herramienta)"
                    v-if="usuario.admin"
                  >
                    <v-icon color="white">mdi-delete</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-5"
                    rounded
                    color="success"
                    elevation="4"
                    @click="prestar(herramienta)"
                  >
                    Seleccionar
                  </v-btn>
                
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="herramienta.imagen"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "leerHerramienta",
      "eliminarHerramienta",
      "agregarPrestamo",
      "quitarHerramienta"
    ]),
    prestar(herramienta) {
      this.agregarPrestamo(herramienta);
      this.quitarHerramienta(herramienta)
    },
  },
  created() {
    this.leerHerramienta();
  },
  computed: {
    ...mapState(["herramientas", "usuario"]),
  },
};
</script>