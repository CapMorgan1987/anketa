<template>
  <div>
    <PollName />

    <v-row class="d-flex">
      <v-col
        cols="12"
        md="6"
        offset-md="3"
        v-for="question in questions"
        :key="question.id"
        class="my-3 pa-5 question"
      >
        <v-form v-model="valid">
          <v-hover v-slot="{ hover }">
            <div class="d-flex mb-4 text-input">
              <h3 v-if="!question.editable">
                {{ question.id }}. {{ question.title }}
              </h3>
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
              <v-checkbox v-if="!q.editableAnswer && !q.lastQuestion">
                <template v-slot:label>
                  <div>
                    {{ q.text }}
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox
                v-else-if="!q.editableAnswer && q.lastQuestion"
                class="other"
              >
                <template v-slot:label>
                  <div>
                    <div class="mb-3">Drugi razlozi</div>
                    <p>
                      {{ q.text }}
                    </p>
                  </div>
                </template>
              </v-checkbox>
              <v-textarea
                v-else-if="q.lastQuestion"
                v-model="editedAnswer"
                :rules="answerRules"
                solo
                label="Molimo upišite komentar"
              ></v-textarea>
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
                v-if="!textareaOpen"
                v-model="newA"
                label="Novi odgovor"
                :rules="answerRules"
                solo
              ></v-text-field>
              <v-textarea
                v-if="textareaOpen"
                v-model="newA"
                :rules="answerRules"
                solo
                label="Molimo upišite komentar"
              ></v-textarea>
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
          <v-btn
            @click="openNewAnswer(question.id)"
            color="orange"
            text
            v-if="!question.hasLastQuestion"
            class="mr-5 pa-5"
          >
            <v-icon left large color="orange" class="pr-2">
              mdi-plus-circle </v-icon
            >Dodaj odgovor
          </v-btn>
          <v-btn
            @click.once="openTextarea(question.id)"
            color="orange"
            text
            class="mr-5 pa-5"
          >
            <v-icon left large color="orange" class="pr-2">
              mdi-plus-circle
            </v-icon>
            Dodaj opciju drugo
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
        textareaOpen: false,
        lastQuestion: false,
        addedLastQuestion: false,
        questions: [
          {
            id: 1,
            title: "Naslov pitanja 1",
            editable: false,
            editableAnswer: false,
            isAddingAnswer: false,
            hasLastQuestion: false,
            answer: [
              {
                id: 1,
                text: "Odgovor 1",
                editableAnswer: false,
                lastQuestion: false,
              },
              // {
              //   id: 2,
              //   text: "Odgovor 2",
              //   editableAnswer: false,
              //   lastQuestion: true,
              // },
              // {
              //   id: 3,
              //   text: "Odgovor 3",
              //   editableAnswer: false,
              //   lastQuestion: true,
              // },
            ],
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
        if (this.lastQuestion === true) {
          this.textareaOpen = true;
        }
        console.log(qid);
        console.log(this.lastQuestion);
      },
      addEditedAnswer(qid, aid) {
        let objIndex = this.questions.findIndex((obj) => obj.id == qid);
        let answerIndex = this.questions[objIndex].answer.findIndex(
          (obj) => obj.id == aid
        );
        if (this.questions[objIndex].answer[answerIndex].lastQuestion) {
          this.questions[objIndex].answer[answerIndex].text = this.editedAnswer;
          this.editedAnswer = "";
          this.questions[objIndex].answer[answerIndex].editableAnswer = false;
          this.questions[objIndex].answer[answerIndex].lastQuestion = true;
        } else {
          this.questions[objIndex].answer[answerIndex].text = this.editedAnswer;
          this.editedAnswer = "";
          this.questions[objIndex].answer[answerIndex].editableAnswer = false;
          this.questions[objIndex].answer[answerIndex].lastQuestion = false;
        }
        console.log(this.questions[objIndex].answer[answerIndex].lastQuestion);
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
      openTextarea(qid) {
        let objIndex = this.questions.findIndex((obj) => obj.id == qid);
        this.questions[objIndex].isAddingAnswer = true;
        this.questions[objIndex].hasLastQuestion = true;
        this.textareaOpen = true;
        this.lastQuestion = true;
        console.log(this.lastQuestion);
      },
      addAnswer(qid) {
        let objIndex = this.questions.findIndex((obj) => obj.id == qid);
        let last = this.questions[objIndex].answer[
          this.questions[objIndex].answer.length - 1
        ];
        let newId = last.id + 1;
        let newAnswer = {
          id: newId,
          text: this.newA,
          editableAnswer: false,
          lastQuestion: this.lastQuestion,
        };
        this.questions[objIndex].answer.push(newAnswer);
        this.newA = "";
        this.questions[objIndex].isAddingAnswer = false;
        this.lastQuestion = false;
        this.textareaOpen = false;
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
          editable: true,
          isAddingAnswer: false,
          hasLastQuestion: false,
          answer: [
            {
              id: 1,
              text: "Dodaj odgovor",
              editableAnswer: false,
              lastQuestion: false,
            },
          ],
        };
        this.questions.push(newQuestion);
        console.log(newQuestion);
      },
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
  .other .v-input__slot {
    display: flex !important;
    flex-direction: row !important;
    background-color: aqua !important;
  }
</style>