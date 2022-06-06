<template>
  <div class="container">
    <div class="question">
      <h2>{{ question }}</h2>
    </div>
    <div class="choices">
      <div>
        <button @click="$emit('answerQuestion', choices[0].isCorrect)">
          {{ choices[0].answer }}
        </button>
      </div>
      <div>
        <button @click="$emit('answerQuestion', choices[1].isCorrect)">
          {{ choices[1].answer }}
        </button>
      </div>
      <div>
        <button @click="$emit('answerQuestion', choices[2].isCorrect)">
          {{ choices[2].answer }}
        </button>
      </div>
      <div>
        <button @click="$emit('answerQuestion', choices[3].isCorrect)">
          {{ choices[3].answer }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const MODE_ADDITION = 1;
const MODE_SUBTRACTION = 2;
const MODE_MULTIPLICATION = 3;
const MODE_DIVISION = 4;

export default {
  data() {
    return {
      question: "",
      choices: [
        { answer: null, isCorrect: false },
        { answer: null, isCorrect: false },
        { answer: null, isCorrect: false },
        { answer: null, isCorrect: false },
      ],
    };
  },

  methods: {
    generateQuestion() {
      let correctAnswer = 0;
      const firstOperand = this.generateRandomNumber(1, 1000);
      const secondOperand = this.generateRandomNumber(1, 1000);
      const operation = this.generateRandomNumber(1, 4);

      switch (operation) {
        case MODE_ADDITION:
          correctAnswer = firstOperand + secondOperand;
          this.question = `What's ${firstOperand} + ${secondOperand}?`;
          break;
        case MODE_SUBTRACTION:
          correctAnswer = firstOperand - secondOperand;
          this.question = `What's ${firstOperand} - ${secondOperand}?`;
          break;
        case MODE_MULTIPLICATION:
          correctAnswer = firstOperand * secondOperand;
          this.question = `What's ${firstOperand} * ${secondOperand}?`;
          break;
        case MODE_DIVISION:
          correctAnswer = (firstOperand / secondOperand).toFixed(2);
          this.question = `What's ${firstOperand} / ${secondOperand}?`;
          break;
        default:
          correctAnswer = 0;
          this.question = "Oops, an Error occurred :/";
      }

      this.choices[0].answer = this.generateRandomNumber(
        correctAnswer - 100,
        correctAnswer + 100,
        correctAnswer
      );
      this.choices[0].isCorrect = false;

      this.choices[1].answer = this.generateRandomNumber(
        correctAnswer - 100,
        correctAnswer + 100,
        correctAnswer
      );
      this.choices[1].isCorrect = false;

      this.choices[2].answer = this.generateRandomNumber(
        correctAnswer - 100,
        correctAnswer + 100,
        correctAnswer
      );
      this.choices[2].isCorrect = false;

      this.choices[3].answer = this.generateRandomNumber(
        correctAnswer - 100,
        correctAnswer + 100,
        correctAnswer
      );
      this.choices[3].isCorrect = false;

      if (operation === MODE_DIVISION) {
        this.choices = this.choices.map((choice) => ({
          ...choice,
          answer: choice.answer.toFixed(2),
        }));
      }

      const correctChoice = this.generateRandomNumber(0, 3);

      this.choices[correctChoice].isCorrect = true;
      this.choices[correctChoice].answer = correctAnswer;
    },

    generateRandomNumber(min, max, except) {
      const randomNumber = Math.round(Math.random() * (max - min)) + min;

      if (randomNumber == except) {
        return this.generateRandomNumber(min, max, except);
      }

      return randomNumber;
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
</style>
