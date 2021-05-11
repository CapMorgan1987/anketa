<template>
  <v-bottom-navigation color="orange">
    <v-btn to="/">
      <span>Uređivanje</span>

      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn>
      <span>Favorites</span>

      <v-icon>mdi-eye</v-icon>
    </v-btn>

    <v-btn>
      <span>Slanje</span>

      <v-icon>mdi-file-send</v-icon>
    </v-btn>

    <v-btn to="/stats">
      <span>Rezultati</span>

      <v-icon>mdi-chart-bar</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    name: "Nav",

    data() {
      return {};
    },
  };
</script>

<style scoped>
  .v-btn {
    color: orange !important;
  }
  .v-item-group.v-bottom-navigation {
    box-shadow: none;
  }
</style>