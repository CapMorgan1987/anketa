<template>
  <v-bottom-navigation color="orange" class="ma-10">
    <v-btn to="/">
      <span>Uređivanje</span>

      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn to="/stats">
      <span>Rezultati</span>

      <v-icon>mdi-chart-bar</v-icon>
    </v-btn>
    <v-btn to="/test">
      <span>Test</span>

      <v-icon>mdi-ab-testing</v-icon>
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