<template>
  <v-form v-model="valid">
    <p>{{valid}}</p>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="herramienta.nombre"
            label="Nombre"
            placeholder="Alicate de corte"
             :rules="[rules.required, rules.min]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="herramienta.cantidad"
            label="Cantidad"
            type="number"
            placeholder="5"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Seleccione una herramienta"
            prepend-icon="mdi-camera"
            label="Imagen"
            @change="examinar($event)"
            :rules="[rules.required]"
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
          <v-btn block large color="success" @click="agregar()" :disabled="valid==false">Guardar</v-btn>
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
     rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },

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