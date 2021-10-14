<script setup>
  import { ref } from 'vue';

  const style = ref({ left: "0px" });
  let imageIndex = 0;

  function next() {
    imageIndex = (imageIndex + 1) % 4;
    style.value.left = `${imageIndex * 320 * -1}px`;
  }
</script>

<template>
  <div class="gallery">
    <p>{{ JSON.stringify(style) }}</p>
    <button @click="next">Next</button>
    <div class="viewport">
      <div class="slider" :style="style" >
        <img src="https://media.istockphoto.com/photos/cat-and-dog-sleeping-puppy-and-kitten-sleep-picture-id1168451046" width="320" />
        <img src="https://media.istockphoto.com/photos/cute-red-kitten-is-sleeping-on-his-back-and-smiling-paws-up-concept-picture-id1144982182" />
        <img src="https://media.istockphoto.com/photos/cute-bengal-funny-cat-playing-picture-id1071204136" />
        <img src="https://media.istockphoto.com/photos/british-short-hair-cat-and-golden-retriever-picture-id992637094" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .viewport {
    width: 320px;
    overflow: hidden;
  }

  .slider {
    position: relative;
    width: 999999px;
    text-align: left;
    left: 0;
    transition: left 0.2s;
  }

  img {
    width: 320px;
  }

</style>
