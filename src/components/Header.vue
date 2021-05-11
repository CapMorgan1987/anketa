<template>
  <v-app-bar app class="header-with-title">
    <div class="d-flex align-center">
      <h2>Ankete</h2>
    </div>
  </v-app-bar>
</template>

<script>
  export default {
    name: "Header",

    data() {
      return {};
    },
  };
</script>

<style>
  .header-with-title {
    border-left: 8px solid orange !important;
  }
</style>