<template>
  <div class="app-wrapper">
    <h1>Arithmetic Quiz</h1>
    <div class="quiz">
      <transition name="flip" mode="out-in">
        <component
          :is="mode"
          @nextQuestion="handleNextQuestion"
          @answerQuestion="handleAnswerQuestion($event)"
        ></component>
      </transition>
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

    handleAnswerQuestion(isCorrect) {
      if (isCorrect) {
        this.mode = "app-answer";
      } else {
        this.mode = "app-question";
        alert("Wrong, try again!");
      }
    },
  },
};
</script>

<style scoped>
.app-wrapper {
  margin: auto;
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  border: 1px solid var(--gray);
  border-radius: 8px;
  padding: 20px 30px;
}

.app-wrapper h1 {
  margin-bottom: 20px;
  font-weight: bold;
  font-style: italic;
  font-size: 40px;
  border-bottom: 1px solid var(--gray);
  width: 100%;
  text-align: center;
  padding-bottom: 30px;
}

.app-wrapper .quiz {
  width: 100%;
  display: flex;
  justify-content: center;
}

.flip-enter-active {
  animation: flip-in 0.4s ease-out;
}

.flip-leave-active {
  animation: flip-out 0.5s ease-out;
}

@keyframes flip-in {
  from {
    transform: rotateY(90deg);
  }

  to {
    transform: rotateY(0deg);
  }
}

@keyframes flip-out {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(90deg);
  }
}

@media (max-width: 375px) {
  .app-wrapper h1 {
    font-size: 30px;
  }
}
</style>
