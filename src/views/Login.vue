<template>
  <v-container>
    
    <v-col cols="12" md="3">
        <img src="../assets/logo.png" width="100%"/>
     </v-col>
   

    <v-divider class="mt-2"></v-divider>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="Minimo 8 caracteres"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <v-btn block color="primary" large>Entrar</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <v-btn block color="error" large @click="google">
            <v-icon left>mdi-google</v-icon>Continuar con Google</v-btn
          ></v-col
        >
      </v-row>
    </v-form>

    <v-container>
      <v-row>
        <p>
          No tienes cuenta?
          <router-link to="/"> Crea una cuenta </router-link>
        </p>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { firebase, auth, db } from "@/firebase";
import { mapMutations, mapActions } from "vuex";
import router from "@/router";
export default {
  data() {
    return {
      valid: false,
      email: "",
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    ...mapMutations(["nuevoUsuario"]),
    ...mapActions(["setUsuario"]),
    google() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.ingresar(provider);
    },
    async ingresar(provider) {
      firebase.auth().languageCode = "es";

      try {
        //Ingreso Usuario
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        this.setUsuario(user);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>