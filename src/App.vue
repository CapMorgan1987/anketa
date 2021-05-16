<template>
  <v-app>
    <Header />
    <v-main>
      <Breadcrumbs v-if="$route.path == '/'" />
      <Nav />
      <v-container>
        <router-view />
      </v-container>
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
  };
</script>

<style>
  a {
    text-decoration: none;
  }
</style>