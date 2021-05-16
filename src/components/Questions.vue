<template>
  <div>
    <PollName />

    <v-row class="d-flex">
      <v-col
        cols="12"
        md="8"
        offset-md="2"
        v-for="question in questions"
        :key="question.id"
        class="my-3 pa-5 question"
      >
        <v-form v-model="valid">
          <v-hover v-slot="{ hover }">
            <div class="d-flex text-input">
              <p v-if="!question.editable">
                {{ question.id }}. {{ question.title }}
              </p>
              <v-text-field
                v-else
                solo
                v-model="newTitle"
                label="Dodaj novo pitanje"
                :rules="titleRules"
              ></v-text-field>
              <v-fab-transition>
                <v-btn
                  @click="editTitle(question.id)"
                  v-if="hover && question.editable === false"
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
                @click="changeTitle(question.id)"
                v-if="valid && question.editable === true"
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
          <v-hover v-slot="{ hover }" v-for="q in question.answer" :key="q.id">
            <div class="d-flex text-input">
              <v-checkbox v-if="!q.editableAnswer">
                <template v-slot:label>
                  <div>
                    {{ q.text }}
                  </div>
                </template>
              </v-checkbox>
              <v-text-field
                v-else
                v-model="editedAnswer"
                label="Izmjeni odgovor"
                :rules="answerRules"
                solo
              ></v-text-field>
              <v-fab-transition>
                <v-btn
                  @click="editAnswer(question.id, q.id)"
                  v-if="hover && q.editableAnswer === false"
                  color="orange"
                  class="edit-icon"
                  small
                  dark
                  fab
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-fab-transition>
              <v-btn
                @click="addEditedAnswer(question.id, q.id)"
                v-if="hover && q.editableAnswer === true && valid"
                color="orange"
                class="add-icon"
                small
                dark
                fab
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-fab-transition>
                <v-btn
                  @click="remove(question.id, q.id)"
                  v-if="hover && question.answer.length > 1 && valid"
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
          <v-hover v-slot="{ hover }" v-if="question.isAddingAnswer">
            <div class="d-flex text-input">
              <v-text-field
                v-model="newA"
                label="Novi odgovor"
                :rules="answerRules"
                solo
              ></v-text-field>
              <v-fab-transition>
                <v-btn
                  @click="addAnswer(question.id)"
                  v-if="hover && valid"
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
          <v-btn @click="openNewAnswer(question.id)" color="orange" dark>
            Dodaj odgovor
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn @click="addNewQuestion()" color="orange" dark>
          Dodaj pitanje
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
        valid: false,
        editable: false,
        newTitle: "",
        titleRules: [
          (v) => !!v || "Upišite naslov",
          (v) => /.+[?]/.test(v) || "A upitnik???",
        ],
        editedAnswer: "",
        answerRules: [(v) => !!v || "Upišite novo pitanje"],
        newA: "",
        questions: [
          {
            id: 1,
            title: "Naslov pitanja 1",
            answer: [
              { id: 1, text: "Odgovor 1", editableAnswer: false },
              // { id: 2, text: "Odgovor 2", editableAnswer: false },
              // { id: 3, text: "Odgovor 3", editableAnswer: false },
            ],
            editable: false,
            editableAnswer: false,
            isAddingAnswer: false,
          },
          // {
          //   id: 2,
          //   title: "Naslov pitanja 2",
          //   answer: [
          //     { id: 1, text: "Odgovor 4", editableAnswer: false },
          //     { id: 2, text: "Odgovor 5", editableAnswer: false },
          //     { id: 3, text: "Odgovor 6", editableAnswer: false },
          //   ],
          //   editable: false,
          //   editableAnswer: false,
          //   isAddingAnswer: false,
          // },
          // {
          //   id: 3,
          //   title: "Naslov pitanja 3",
          //   answer: [{ id: 1, text: "Odgovor 7", editableAnswer: false }],
          //   editable: false,
          //   editableAnswer: false,
          //   isAddingAnswer: false,
          // },
        ],
      };
    },
    methods: {
      editTitle(id) {
        let objIndex = this.questions.findIndex((obj) => obj.id == id);
        this.questions[objIndex].editable = true;
        console.log(id);
      },
      changeTitle(id) {
        let objIndex = this.questions.findIndex((obj) => obj.id == id);
        this.questions[objIndex].title = this.newTitle;
        this.questions[objIndex].editable = false;
        console.log(this.newTitle);
        this.newTitle = "";
      },
      editAnswer(qid, aid) {
        let objIndex = this.questions.findIndex((obj) => obj.id == qid);
        let answerIndex = this.questions[objIndex].answer.findIndex(
          (obj) => obj.id == aid
        );
        this.questions[objIndex].answer[answerIndex].editableAnswer = true;
        console.log(qid);
      },
      addEditedAnswer(qid, aid) {
        let objIndex = this.questions.findIndex((obj) => obj.id == qid);
        let answerIndex = this.questions[objIndex].answer.findIndex(
          (obj) => obj.id == aid
        );
        this.questions[objIndex].answer[answerIndex].text = this.editedAnswer;
        this.editedAnswer = "";
        this.questions[objIndex].answer[answerIndex].editableAnswer = false;
        console.log(this.editedAnswer);
      },
      remove(qid, aid) {
        let objIndex = this.questions.findIndex((obj) => obj.id == qid);
        let answerIndex = this.questions[objIndex].answer.findIndex(
          (obj) => obj.id == aid
        );
        this.questions[objIndex].answer.splice(answerIndex, 1);
        console.log(objIndex, answerIndex);
      },
      openNewAnswer(qid) {
        let objIndex = this.questions.findIndex((obj) => obj.id == qid);
        this.questions[objIndex].isAddingAnswer = true;
      },
      addAnswer(qid) {
        let objIndex = this.questions.findIndex((obj) => obj.id == qid);
        let last = this.questions[objIndex].answer[
          this.questions[objIndex].answer.length - 1
        ];
        // let newId = "";
        // if (last.id === "undefined") {
        //   console.log("no answers");
        //   newId = 1;
        // } else {
        //   newId = last.id + 1;
        // }
        let newId = last.id + 1;
        let newAnswer = {
          id: newId,
          text: this.newA,
          editableAnswer: false,
        };
        this.questions[objIndex].answer.push(newAnswer);
        this.newA = "";
        this.questions[objIndex].isAddingAnswer = false;
        // console.log(this.questions[objIndex].answer.length);
        console.log(last);
        console.log(qid);
        // console.log(last.id);
        // console.log(newId);
        // console.log(newId);
        // console.log(newAnswer);
      },
      addNewQuestion() {
        let lastQuestionId = this.questions[this.questions.length - 1];
        let newQuestionId = lastQuestionId.id + 1;
        let newQuestion = {
          id: newQuestionId,
          title: "Novo pitanje",
          answer: [
            {
              id: 1,
              text: "Dodaj odgovor",
              editableAnswer: false,
            },
          ],
          editable: true,
          isAddingAnswer: false,
        };
        this.questions.push(newQuestion);
        console.log(newQuestion);
      },
      deleteQuestion() {},
    },
    components: {
      PollName,
    },
  };
</script>

<style scoped>
  .question {
    border: 1px solid rgb(204, 204, 204);
    border-radius: 25px;
  }
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
  .edit-icon {
    z-index: 999;
    position: absolute;
    right: 0px;
  }
  .add-icon {
    z-index: 999;
    position: absolute;
    right: 0px;
  }
  .remove-icon {
    z-index: 999;
    position: absolute;
    right: -50px;
  }
</style>