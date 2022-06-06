<template>
  <div class="question">
    <h1>That's Correct!</h1>
    <hr />
    <button @click="$emit('nextQuestion')">Next Question</button>
  </div>
</template>

<script></script>

<style scoped>
.question {
  padding: 20px;
  max-width: 500px;
  width: 100%;
  background-color: rgba(40, 167, 69, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  border-radius: 10px;
}

.question h1 {
  color: var(--success);
}

.question hr {
  width: 100%;
  margin: 20px 0 10px 0;
  border-top: 1px solid var(--gray);
}

.question button {
  font-size: 18px;
}

@media (max-width: 375px) {
  .question h1 {
    font-size: 28px;
  }
}
</style>
