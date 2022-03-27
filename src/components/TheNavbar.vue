<template lang='pug'>
ul.navbar
  li.flex
    input.pl-2.text-black(:value='city' ref='input' placeholder='Enter your city...' @keydown.enter='add')
    button(@click="$store.commit('setCity',$refs.input.value)")
      img(class='h-4/5' src='../assets/search.svg')
  //- li(v-for='c in cities' @click='city=c') {{c}}
</template>

<script>
export default {
  data:()=>({
  }),
  methods:{
    add(){
      this.$store.commit('addCity',this.city)
      localStorage.setItem('cities',this.cities)
    },
  },
  computed:{
    cities(){
      return this.$store.state.cities
    },
    city:{
      get(){
        return this.$store.state.city
      },
      set(current){

        // this.$store.commit('setCity',current)  
      }
    }
  },
  created(){
    let ls=localStorage.getItem('cities')
    let cities
    ls?cities=ls.split(','):[]
    cities
      ?(this.$store.commit('fillStore',cities),this.$store.commit('setCity','Сыктывкар'))
      :(this.$store.commit('setCity','Сыктывкар'),this.$store.commit('addCity','Сыктывкар'))
  }
}
</script>

<style scoped>
.navbar{
  @apply flex justify-around
}
.router-link-exact-active{
  text-decoration: underline;
}
input{
  border-radius: 10px 0 0 10px;
}
button{
  padding-right: 10px;
  padding-left: 10px;
  background: white;
  color:black;
  border-radius:0 10px 10px 0
}
img{
  max-width: unset;
}
</style>