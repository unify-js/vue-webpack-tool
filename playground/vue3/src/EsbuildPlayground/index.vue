<script setup lang="ts">
import { ref } from "vue";

const count = ref<number>(0);
</script>

<template>
  <div>
    <button @click="count++">click</button>

    <span>{{ count }}</span>
  </div>
</template>

<style lang="scss" scoped></style>
