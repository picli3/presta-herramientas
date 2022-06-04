<template>
  <form class="form-inline my-2 my-lg-0">
          <v-text-field
            solo
            :label="texto"
            append-icon="mdi-filter"
          ></v-text-field>
  </form>
</template>
<script>
export default {
  props:
    ['texto']
  
}
</script>