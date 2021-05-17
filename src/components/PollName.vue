<template>
  <v-row class="d-flex">
    <v-col cols="12" md="4" offset-md="4" class="my-3 pa-5 question">
      <v-form v-model="valid">
        <v-hover v-slot="{ hover }">
          <div class="d-flex text-input">
            <h2 class="orange--text" v-if="!editable">
              {{ title }}
            </h2>
            <v-text-field
              v-else
              solo
              v-model="newTitle"
              label="Nova anketa"
              :rules="titleRules"
            ></v-text-field>
            <v-fab-transition>
              <v-btn
                @click="editTitle()"
                v-if="hover && editable === false"
                color="orange"
                class="edit-title-icon"
                small
                dark
                fab
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-fab-transition>
            <v-btn
              @click="changeTitle()"
              v-if="valid && editable === true"
              color="orange"
              class="add-title-icon"
              small
              dark
              fab
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-hover>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "PollName",
    data() {
      return {
        title: "Nova anketa",
        newTitle: "",
        valid: false,
        editable: false,
        titleRules: [(v) => !!v || "Upišite naziv ankete"],
      };
    },
    methods: {
      editTitle() {
        this.editable = true;
      },
      changeTitle() {
        this.$store.state.title = this.newTitle;
        this.title = this.newTitle;
        this.editable = false;
        console.log(this.newTitle);
        this.newTitle = "";
      },
    },
  };
</script>

<style scoped>
  .text-input {
    position: relative;
  }
  .edit-title-icon {
    z-index: 999;
    position: absolute;
    right: 0px;
  }
  .add-title-icon {
    z-index: 999;
    position: absolute;
    right: 0px;
  }
</style>