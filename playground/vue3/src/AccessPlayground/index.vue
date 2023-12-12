<script setup lang="ts">
import gifImage from "./images/SampleGIFImage_40kbmb.gif";
import jpgImage from "./images/SampleJPGImage_50kbmb.jpg";
import pngImage from "./images/SamplePNGImage_100kbmb.png";
import webpImage from "./images/file_example_WEBP_50kB.webp";

const images = [
  { src: gifImage, title: "gif" },
  { src: jpgImage, title: "jpg" },
  { src: pngImage, title: "png" },
  { src: webpImage, title: "webp" },
];
</script>

<template>
  <h1>Access Playground</h1>

  <div v-for="item in images">
    <h2>{{ item.title }}</h2>
    <img :src="item.src" />
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "myFont";
  src: url("./font/HedvigLettersSerif-Regular-VariableFont_opsz.ttf")
    format("ttf");
}

h1 {
  font-family: "myFont";
}
</style>
