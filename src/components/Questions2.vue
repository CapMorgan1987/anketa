<template>
  <div>
    <PollName />
    <v-row v-for="(q, index) in questions" :key="index">
      <v-col cols="12" sm="6" md="9">
        <v-hover v-slot="{ hover }">
          <div class="d-flex text-input">
            <p v-if="!q.editable">{{ q.id }}. {{ q.title }}</p>
            <v-text-field
              v-else
              v-model="q.title"
              label="Naslov Pitanja"
              solo
            ></v-text-field>
            <v-fab-transition>
              <v-btn
                @click="editQuestion(q.id)"
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
                @click="addEditedQuestion(q.id)"
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

        <v-hover v-slot="{ hover }" v-for="(a, index) in q.answer" :key="index">
          <div class="d-flex text-input">
            <!-- <p v-if="!isEditing">{{ index + 1 }} - {{ question.question }}</p> -->

            <v-checkbox v-if="!q.editable" :value="a">
              <template v-slot:label>
                <div>
                  {{ a.text }}
                </div>
              </template>
            </v-checkbox>
            <v-text-field
              v-else
              :v-model="a.text"
              :label="a.text"
              solo
            ></v-text-field>
            <v-fab-transition>
              <v-btn
                @click="editQuestion(q.id)"
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
                @click="addEditedQuestion(q.id)"
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
        <v-btn
          v-if="q.editable"
          @click="addNewQuestion(q.id)"
          color="orange"
          dark
        >
          Add question
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="9"> </v-col>
    </v-row>
  </div>
</template>

<script>
  import PollName from "./PollName";

  export default {
    data() {
      return {
        questions: [
          {
            id: 1,
            title: "Naslov pitanja 1",
            answer: [
              { id: 1, text: "Pitanje 1", status: false },
              { id: 2, text: "Pitanje 2", status: false },
              { id: 3, text: "Pitanje 3", status: false },
            ],
            editable: false,
          },
          {
            id: 2,
            title: "Naslov pitanja 2",
            answer: [
              { id: 1, text: "Pitanje 1", status: false },
              { id: 2, text: "Pitanje 2", status: false },
              { id: 3, text: "Pitanje 3", status: false },
            ],
            editable: false,
          },
          {
            id: 3,
            title: "Naslov pitanja 3",
            answer: [
              { id: 1, text: "Pitanje 1", status: false },
              { id: 2, text: "Pitanje 2", status: false },
              { id: 3, text: "Pitanje 3", status: false },
            ],
            editable: false,
          },
        ],
      };
    },
    components: {
      PollName,
    },
    methods: {
      editQuestion(id) {
        let objIndex = this.questions.findIndex((obj) => obj.id == id);
        this.questions[objIndex].editable = true;
        console.log(id);
      },
      editAnswer(id) {
        let objIndex = this.questions.answer.findIndex((obj) => obj.id == id);
        this.questions.answer[objIndex].editable = true;
        console.log(id);
      },
      addEditedQuestion(id) {
        let objIndex = this.questions.findIndex((obj) => obj.id == id);
        this.questions[objIndex].editable = false;
        console.log(this.questions[id].title);
      },
      addEditedAnswer(id) {
        let objIndex = this.questions.findIndex((obj) => obj.id == id);
        this.questions[objIndex].editable = false;
        console.log(id);
      },
      addNewAnswer(qid) {
        let questionIndex = this.questions.findIndex((obj) => obj.id == qid);
        //let answerIndex = this.questions.answer.findIndex((obj) => obj.id == aid);
        let last = this.questions[questionIndex].answer[
          this.questions[questionIndex].answer.length - 1
        ];
        let new_id = last.id + 1;
        let new_answer = {
          id: new_id,
          text: "novo pitanje",
          status: false,
        };
        this.questions[questionIndex].answer.push(new_answer);
        console.log(new_answer);
      },
      addQuestion() {
        let last = this.questions[this.questions.length - 1];
        let new_id = last.id + 1;
        let newQuestion = {
          id: new_id,
          title: "",
          answer: [],
          editable: true,
        };
        this.questions.push(newQuestion);
      },
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
    right: -25px;
  }
  .add-icon {
    z-index: 999;
    position: absolute;
    right: 25px;
  }
</style>