<script setup>
import { ref } from 'vue';
  console.log('Image Gallery');
  const images = [
    "https://media.istockphoto.com/photos/kitten-with-his-paw-up-picture-id149052633",
    "https://media.istockphoto.com/photos/british-short-hair-cat-and-golden-retriever-picture-id992637094",
    "https://media.istockphoto.com/photos/cute-tabby-kittens-sleeping-and-hugging-picture-id480615728"
  ];

  const leftValues = [0, -320, -640];
  let currentImage = 0;
  const style = ref({});

  function nextImage() {
    currentImage = (currentImage+ 1) % leftValues.length;
    style.value = { left: leftValues[currentImage] + 'px' }
  }
</script>

<template>
  <div class="slider">
    <div class="viewport">
      <div class="images" :style="style">
        <img v-for="src in images" :src="src" />
      </div>
    </div>
    <button @click="nextImage()">Next {{JSON.stringify(style)}}</button>
  </div>
</template>

<style scoped>
  p { color: red; }
  img {
    width: 320px;
  }

  .viewport {
    width: 320px;
    overflow: hidden;
  }

  .images {
    width: 9999999999999999999px;
    position: relative;
    transition: left 0.2s;
    left: 0;
  }

</style>
