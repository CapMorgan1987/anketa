<template>
  <div>
    <v-breadcrumbs :items="itemsData()"></v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumbs",

    data() {
      return {
        title: "Nova anketa",

        items: [
          { text: "Ankete", disabled: false },
          { text: "test", disabled: false },
        ],
      };
    },
    methods: {
      itemsData() {
        this.items[1].text = this.title;
        return this.items;
      },
    },
  };
</script>

<style>
</style>

