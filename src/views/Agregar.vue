<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="herramienta.nombre"
            label="Nombre"
            placeholder="Alicate de corte"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="herramienta.cantidad"
            label="Cantidad"
            placeholder="5"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Seleccione una herramienta"
            prepend-icon="mdi-camera"
            label="Imagen"
            @change="examinar($event)"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-container>
        <v-row>
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-width="100%"
            position="center"
            :src="urlTemp"
          ></v-img>
        </v-row>
      </v-container>

      <v-row>
        <v-col cols="12" md="4">
          <v-btn block large color="success" @click="agregar()">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,

    urlTemp: "",
    herramienta: {
      nombre: "",
      cantidad: "",
      fecha: "",
      file: null,
      imagen: "",
      idh:""
    },
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
  }),
  methods: {
    examinar($event) {
      this.herramienta.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.herramienta.file);
      reader.onload = (e) => {
        this.urlTemp = e.target.result;
      };
    },
    ...mapActions(["agregarHerramienta"]),
    agregar() {
      this.agregarHerramienta(this.herramienta);
    },
  },
};
</script>