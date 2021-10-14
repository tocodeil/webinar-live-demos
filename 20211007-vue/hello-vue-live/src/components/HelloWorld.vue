<script setup>
import { ref } from 'vue';

// Change detection / Data Management / State Management
// Event handling
const counter = ref(0);
const name = ref('');

function handleClick() {
  counter.value++;
}

function reset() {
  name.value = '';
}

</script>

<template>
  <div class="container">
    <p>yo I'm a component</p>
    <button @click="handleClick()">You clicked {{ counter }} times</button>
    <label>
      Who are you?
      <input type="text" v-model="name" />
      <p>Hello {{name}}</p>
      <button @click="reset()">Reset</button>
    </label>
  </div>
</template>

<style scoped>
  .container {
    background: red;
    width: 50%;
    margin: 10px auto;
    padding: 10px;
    border-radius: 10px;
  }
</style>
