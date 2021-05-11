<template>
  <v-app>
    <Header />
    <v-main>
      <Breadcrumbs />
      <Nav />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import Header from "./components/Header";
  import Breadcrumbs from "./components/Breadcrumbs";
  import Nav from "./components/Nav";

  export default {
    name: "App",

    components: {
      Header,
      Breadcrumbs,
      Nav,
    },

    data: () => ({}),
  };
</script>

<style>
  a {
    text-decoration: none;
  }
</style>