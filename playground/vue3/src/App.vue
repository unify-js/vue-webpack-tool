<script setup lang="ts">
import { routes } from "./routers";
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.nav">
      <router-link v-for="route in routes" :key="route.path" :to="route.path">{{
        route.meta.title
      }}</router-link>
    </div>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  gap: 20px;
}

.nav {
  width: 150px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  > .link {
    color: rgb(20, 122, 156);
  }
}
</style>
