import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      cities:[],
      city:''
    }
  },
  mutations: {
    addCity (state,city) {
      state.cities.push(city)
    },
    setCity(state,city){
      state.city=city
    },
    fillStore(state,cities){
      state.cities=cities
    }
  }
})
export default store
