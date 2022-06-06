<template>
  <div class="container">
    <div class="question">
      <h2>{{ question }}</h2>
    </div>
    <div class="choices">
      <div>
        <button
          :class="choiceClasses(choices[0])"
          @click="onAnswerClick(choices[0])"
        >
          {{ choices[0].answer }}
        </button>
      </div>
      <div>
        <button
          :class="choiceClasses(choices[1])"
          @click="onAnswerClick(choices[1])"
        >
          {{ choices[1].answer }}
        </button>
      </div>
      <div>
        <button
          :class="choiceClasses(choices[2])"
          @click="onAnswerClick(choices[2])"
        >
          {{ choices[2].answer }}
        </button>
      </div>
      <div>
        <button
          :class="choiceClasses(choices[3])"
          @click="onAnswerClick(choices[3])"
        >
          {{ choices[3].answer }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { generateRandomNumber } from "../utils";

const MODE_ADDITION = 1;
const MODE_SUBTRACTION = 2;
const MODE_MULTIPLICATION = 3;
const MODE_DIVISION = 4;

export default {
  data() {
    return {
      question: "",
      choices: [
        { answer: null, isCorrect: false, clicked: false },
        { answer: null, isCorrect: false, clicked: false },
        { answer: null, isCorrect: false, clicked: false },
        { answer: null, isCorrect: false, clicked: false },
      ],
    };
  },

  methods: {
    onAnswerClick(choice) {
      if (choice.clicked) return;

      choice.clicked = true;

      if (choice.isCorrect) {
        setTimeout(() => {
          this.$emit("answerQuestion");
        }, 1000);
      }
    },

    generateQuestion() {
      const operation = generateRandomNumber(1, 4);
      const correctAnswer = this.formulateQuestion(operation);

      this.populateChoice(this.choices[0], correctAnswer);
      this.populateChoice(this.choices[1], correctAnswer);
      this.populateChoice(this.choices[2], correctAnswer);
      this.populateChoice(this.choices[3], correctAnswer);

      // Set float with 2 decimal digits for division operation;
      if (operation === MODE_DIVISION) {
        this.choices = this.choices.map((choice) => ({
          ...choice,
          answer: choice.answer.toFixed(2),
        }));
      }

      // Populate the correct answer
      const correctChoice = generateRandomNumber(0, 3);
      this.choices[correctChoice].isCorrect = true;
      this.choices[correctChoice].answer = correctAnswer;
    },

    formulateQuestion(operation) {
      const firstOperand = generateRandomNumber(1, 1000);
      const secondOperand = generateRandomNumber(1, 1000);

      switch (operation) {
        case MODE_ADDITION:
          this.question = `What's ${firstOperand} + ${secondOperand}?`;
          return firstOperand + secondOperand;

        case MODE_SUBTRACTION:
          this.question = `What's ${firstOperand} - ${secondOperand}?`;
          return firstOperand - secondOperand;

        case MODE_MULTIPLICATION:
          this.question = `What's ${firstOperand} * ${secondOperand}?`;
          return firstOperand * secondOperand;

        case MODE_DIVISION:
          this.question = `What's ${firstOperand} / ${secondOperand}?`;
          return (firstOperand / secondOperand).toFixed(2);

        default:
          this.question = "";
          return 0;
      }
    },

    populateChoice(choice, correctAnswer) {
      choice.answer = generateRandomNumber(
        correctAnswer - 100,
        correctAnswer + 100,
        correctAnswer
      );

      choice.isCorrect = false;
    },

    choiceClasses(choice) {
      return {
        incorrect: choice.clicked && !choice.isCorrect,
        correct: choice.clicked && choice.isCorrect,
      };
    },
  },

  created() {
    this.generateQuestion();
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--gray);
}

.question {
  padding: 10px;
  background: rgba(211, 211, 211, 0.5);
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--gray);
}

.question h2 {
  font-weight: 600;
  font-size: 20px;
}

.choices {
  display: flex;
  flex-wrap: wrap;
}

.choices > div {
  width: 50%;
  display: flex;
  justify-content: center;
}

.choices > div button {
  margin: 10px;
  padding: 10px 30px;
}

.correct {
  background-color: var(--success);
}

.incorrect {
  background-color: var(--danger);
}

.incorrect:hover {
  cursor: not-allowed;
}
</style>
