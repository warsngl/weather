import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      cities: [],
      city: {},
    };
  },
  mutations: {
    addCity(state, city) {
      state.cities.push(city);
      localStorage.setItem("cities", JSON.stringify(state.cities));
    },
    removeCity(state, city) {
      state.cities = state.cities.filter((c) => c != city);
      localStorage.setItem("cities", JSON.stringify(state.cities));
    },
    setCity(state, city) {
      let hasCity = state.cities.find((c) => c.name == city.toLowerCase());
      hasCity
        ? (state.city = hasCity)
        : (state.city = { name: city.toLowerCase(), isFavour: false });
    },
    fillStore(state, cities) {
      state.cities = cities;
    },
  },
});
export default store;
