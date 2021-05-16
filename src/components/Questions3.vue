<template>
  <div>
    <PollName />

    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="6" md="9">
        <v-hover v-slot="{ hover }">
          <div class="d-flex text-input">
            <p v-if="!editable">1. {{ title }}</p>
            <v-text-field
              v-else
              solo
              v-model="newTitle"
              :label="title"
            ></v-text-field>
            <v-fab-transition>
              <v-btn
                @click="edit()"
                v-if="hover"
                color="orange"
                class="edit-icon"
                small
                dark
                fab
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-fab-transition>
            <v-fab-transition>
              <v-btn
                @click="changeTitle()"
                v-if="hover"
                color="orange"
                class="add-icon"
                small
                dark
                fab
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </div>
        </v-hover>
        <v-hover
          v-slot="{ hover }"
          v-for="(answer, index) in newAnswers"
          :key="index"
        >
          <div class="d-flex text-input">
            <v-checkbox>
              <template v-slot:label>
                <div>
                  {{ answer }}
                </div>
              </template>
            </v-checkbox>
            <v-fab-transition>
              <v-btn
                @click="remove(index)"
                v-if="hover"
                color="orange"
                class="remove-icon"
                small
                dark
                fab
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-fab-transition>
          </div>
        </v-hover>
        <v-hover v-slot="{ hover }" v-if="isAddingAnswer">
          <div class="d-flex text-input">
            <v-text-field
              v-model="newA"
              label="Novi odgovor"
              solo
            ></v-text-field>
            <v-fab-transition>
              <v-btn
                @click="addAnswer"
                v-if="hover"
                color="orange"
                class="add-icon"
                small
                dark
                fab
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </div>
        </v-hover>
        <v-btn @click="addNewAnswer()" color="orange" dark>
          Dodaj odgovor
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import PollName from "./PollName";
  export default {
    data() {
      return {
        editable: false,
        newTitle: "",
        isAddingAnswer: false,
        newA: "",
        newAnswers: [],
        title: "Pitanje",
      };
    },
    methods: {
      edit() {
        this.editable = true;
      },
      changeTitle() {
        this.editable = false;

        this.title = this.newTitle;
        console.log(this.newTitle);
      },
      remove(index) {
        //this.newAnswers.splice(this.newAnswers.indexOf(answer), 1);
        this.newAnswers.splice(index, 1);
        this.editable = false;
      },
      addAnswer() {
        this.newAnswers.push(this.newA);
        this.newA = "";
        this.isAddingAnswer = false;
      },
      addNewAnswer() {
        this.isAddingAnswer = true;
      },
    },
    components: {
      PollName,
    },
  };
</script>

<style scoped>
  .text-input {
    position: relative;
  }
  .edit-icon {
    z-index: 999;
    position: absolute;
    right: 75px;
  }
  .add-icon {
    z-index: 999;
    position: absolute;
    right: 25px;
  }
  .remove-icon {
    z-index: 999;
    position: absolute;
    right: -25px;
  }
</style>