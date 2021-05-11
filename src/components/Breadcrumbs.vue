<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumbs",

    data() {
      return {
        items: [{ text: "Ankete" }],
      };
    },
  };
</script>

<style>
</style>