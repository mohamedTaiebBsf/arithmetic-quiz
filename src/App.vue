<template>
  <div class="container">
    <h1>Arithmetic Quiz</h1>
    <div class="quiz">
      <component :is="mode" @nextQuestion="handleNextQuestion"></component>
    </div>
  </div>
</template>

<script>
import Answer from "./components/Answer.vue";
import Question from "./components/Question.vue";

export default {
  components: {
    AppAnswer: Answer,
    AppQuestion: Question,
  },

  data() {
    return {
      mode: "app-question",
    };
  },

  methods: {
    handleNextQuestion() {
      this.mode = "app-question";
    },
  },
};
</script>

<style>
@import "./assets/css/index.css";
</style>
