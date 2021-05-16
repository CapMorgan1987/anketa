<template>
  <div>
    <h2 class="text-center">Test list</h2>
    <div>
      <h3>My list</h3>
      <div class="d-flex">
        <v-text-field
          label="add to list"
          type="text"
          v-model="newItem"
          solo
        ></v-text-field>
        <v-btn elevation="2" @click="addToList()">Add to list</v-btn>
      </div>
      <div>
        <p v-if="list.length === 0">List is empty</p>
        <ul v-else>
          <li v-for="(l, i) in list" :key="i">{{ i + 1 }}. {{ l }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newItem: "",
        list: [],
      };
    },
    methods: {
      addToList() {
        this.list.push(this.newItem);
        this.newItem = "";
        console.log(this.list);
      },
    },
  };
</script>

<style>
  li {
    list-style: none;
  }
</style>