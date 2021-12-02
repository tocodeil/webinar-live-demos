<script setup>
import { ref } from 'vue'

defineProps({ msg: String })

const count = ref(0)
</script>

<template>
  <div class="container">
    <h2>{{ msg }}</h2>
    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
</template>

<style scoped>
.container {
  text-align: left;
  box-shadow: 0 0 5px 5px rgba(0,0,0,0.4);
  margin: 20px;
  padding: 5px;
}
</style>
