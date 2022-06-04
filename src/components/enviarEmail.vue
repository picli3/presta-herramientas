<template>
  <v-card class="my-4">
    <v-container>
      <v-form v-model="valid" @submit.prevent="sendEmail">
        <v-text-field v-model="name" label="Nombre"></v-text-field>
        <v-text-field v-model="email" label="Email" type="email"></v-text-field>
        <v-textarea v-model="message" label="Mensaje" hint="text"></v-textarea>
        <v-btn block large color="success" type="submit">Enviar</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

export default {
  name: "ContactUs",
  data() {
    return {
      valid: "",
      name: "",
      email: "",
      message: "",
      USER_ID: "user_RD1b0c52cZuhvgSLgWK5r",
      TEMLPATE_ID: "template_63wof5i",
      SERVICE_ID: "service_e8ah6uw",
    };
  },
  methods: {
    async sendEmail() {
      try {
        emailjs.init(this.USER_ID);
        const res = await emailjs.send("service_e8ah6uw", "template_63wof5i", {
          name: this.name,
          message: this.message,
          to: this.email,
          email: "jmaykol.rey@gmail.com",
        });
        if (res.status === 200) {
          Swal.fire("Solicitud enviada");
          this.name = "";
          this.message = "";
          this.email = "";
        }
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>