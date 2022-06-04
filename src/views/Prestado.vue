<template>
  <v-container>
    <Buscar texto="Quien lo tiene?"></Buscar>
    <v-row justify="center">
      <v-expansion-panels inset>
        <v-expansion-panel v-for="(user, i) in usuarios" :key="i">
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="12">
                <v-badge avatar bordered overlap v-if="user.admin">
                  <template v-slot:badge>
                    <v-avatar>
                      <v-icon>mdi-star</v-icon>
                    </v-avatar>
                  </template>
                  <v-avatar size="40">
                    <v-img :src="user.foto"></v-img>
                  </v-avatar>
                </v-badge>

                <v-avatar size="40" v-else>
                  <v-img :src="user.foto"></v-img>
                </v-avatar>

                <strong class="ml-3" v-html="user.nombre"></strong>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="(pretamo, index) in pretamos" :key="index">
              <div v-if="pretamo.uid === user.uid">
                <v-list>
                  <v-list-item>
                    <v-list-item-icon v-if="pretamo.uid === usuario.uid">
                      <v-btn
                        icon
                        elevation="4"
                        @click="devolverPrestamo(pretamo)"
                      >
                        <v-icon color="red"> mdi-redo </v-icon>
                      </v-btn>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="pretamo.nombre"
                      ></v-list-item-title>
                      <v-list-item-title class="text--disabled">{{
                        pretamo.fecha
                      }}</v-list-item-title>
                      <v-list-item-title>
                        <v-btn
                          color="red"
                          dark
                          rounded
                          elevation="4"
                          class="my-2"
                          @click="solicitar(pretamo.uid, pretamo.nombre)"
                          >Solicitar</v-btn
                        >
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-avatar>
                      <v-img :src="pretamo.imagen"></v-img>
                    </v-list-item-avatar>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Buscar from "../components/Buscar";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

export default {
  name: "Prestado",
  components: { Buscar },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "leerPrestamo",
      "leerUsuario",
      "devolverPrestamo",
      "devolverHerramienta",
    ]),
    async solicitar(uid, herramienta) {
      let email2 = "";
      let nombre = "";
      for (const usuario in this.usuarios) {
        if (this.usuarios[usuario].uid === uid) {
          email2 = this.usuarios[usuario].email;
          nombre = this.usuarios[usuario].nombre;
        }
      }

      try {
        emailjs.init("user_RD1b0c52cZuhvgSLgWK5r");
        const res = await emailjs.send("service_e8ah6uw", "template_63wof5i", {
          name: nombre,
          message:
            "Hemos visto que cuenta con la herramienta " +
            herramienta +
            " y " +
            this.usuario.nombre +
            " la esta necesitando para otro trabajo, Agredeceriamos que la pueda devolver lo mas pronto posible",
          to: email2,
          email: "jmaykol.rey@gmail.com",
        });
        if (res.status === 200) {
          Swal.fire("Solicitud enviada");
        }
      } catch (error) {
        console.log({ error });
      }
    },
  },
  created() {
    this.leerPrestamo();
    this.leerUsuario();
  },
  computed: {
    ...mapState(["pretamos", "usuarios", "usuario"]),
  },
};
</script>