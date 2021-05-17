<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item>{{ item.text }}</v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumbs",

    data() {
      return {
        breadcrumbs: [
          { text: "Ankete", disabled: false },
          { text: this.$store.state.title, disabled: false },
        ],
      };
    },
    computed: {
      title() {
        return this.$store.state.title;
      },
    },
    watch: {
      title(value) {
        this.breadcrumbs[1].text = value;
        console.log(`title changes to ${value}`);
      },
    },
  };
</script>

<style>
</style>

