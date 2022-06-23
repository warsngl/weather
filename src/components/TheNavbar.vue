<template lang='pug'>
.flex
  input.pl-2.text-black(
    :value="city.name",
    ref="input",
    placeholder="Enter your city...",
    @keydown.enter="city = $refs.input.value"
  )
  button(@click="city = $refs.input.value")
    img(class="h-4/5", src="../assets/search.svg")
.cities-list
  span.up(@click='prevCity') ←
  .flex.flex-1.justify-center
    .mr-1.font-bold.text-black {{ city.name.toUpperCase() }}
    svg.w-4.cursor-pointer(@click="isFavour = !isFavour", viewBox="0 0 512 512")
      path(
        :fill="isFavour ? 'red' : 'white'",
        d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
      )
  span.up(@click='nextCity') →
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    prevCity(){
      let idx=this.cities.indexOf(this.city)
      if(idx==0) return
      else this.$store.state.city=this.$store.state.cities[idx-1]
    },
    nextCity(){
      let idx=this.cities.indexOf(this.city)
      if(idx==this.cities.length-1) return
      else this.$store.state.city=this.$store.state.cities[idx+1]
    }
  },
  watch: {},
  computed: {
    cities() {
      return this.$store.state.cities;
    },
    city: {
      get() {
        return this.$store.state.city;
      },
      set(val) {
        this.$store.commit("setCity", val);
      },
    },
    isFavour: {
      get() {
        return this.$store.state.city.isFavour;
      },
      set(val) {
        this.$store.state.city.isFavour = val;
        val
          ? this.$store.commit("addCity", this.city)
          : this.$store.commit("removeCity", this.city);
      },
    },
  },
  created() {
    let cities = JSON.parse(localStorage.getItem("cities"));
    cities
      ? (this.$store.commit("fillStore", cities),
        this.$store.commit("setCity", this.cities[0].name))
      : (this.$store.commit("setCity", "сыктывкар"),
        this.$store.commit("addCity", this.city));
  },
  beforeUnmount() {
    localStorage.setItem("cities", JSON.stringify(this.cities));
  },
};
</script>

<style scoped>
.router-link-exact-active {
  text-decoration: underline;
}
input {
  border-radius: 10px 0 0 10px;
}
button {
  padding-right: 25px;
  background: white;
  color: black;
  border-radius: 0 10px 10px 0;
}
img {
  max-width: unset;
}
.cities-list{
  @apply  flex mt-3 w-64
}
.up{
  margin-top: -2px;
  @apply mx-2 cursor-pointer
}
</style>