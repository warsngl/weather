<script>
import TheNavbar from "./components/TheNavbar.vue";
export default {
  data:()=>({
  }),
  components: { TheNavbar },
};
</script>

<template lang='pug'>
.flex.flex-col.items-center
  TheNavbar.mb-8
  router-view
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  min-width: 100vw;
  min-height: 100vh;
  padding: 20px;
  background: rgb(120, 120, 231);
}
</style>
