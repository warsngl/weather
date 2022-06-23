<template lang='pug'>
.flex.flex-col.items-center.justify-center(v-if="weather")
  TheLoading(v-if='isLoading')
  img(v-else :src="'http://openweathermap.org/img/wn/' + icon + '@2x.png'")
  p {{ day }} | {{ month }} {{ date }}
  p.text-2xl {{ temp }}°
  p {{ description }}
  br
  .flex.flex-wrap.w-96.px-10
    .flex.items-center.mb-4(class="w-1/2", v-for="option in options")
      img.w-8.h-8(
        :src="'./src/assets/' + option.img",
        :style="option.img == 'navigation.png' ? `transform:rotate(${deg}deg)` : null"
      )
      .pl-2
        p {{ option.value }}
        p {{ option.text }}
</template>

<script>
import TheLoading from './TheLoading.vue'
export default {
  data: () => ({
    weather: {},
    description: "",
    temp: "",
    wind: "",
    humidity: "",
    pressure: "",
    clouds: "",
    deg: "",
    icon: "04n",
    day: "",
    month: "",
    date: "",
    isLoading:false,
  }),
  computed: {
    options() {
      return [
        { img: "navigation.png", value: `${this.wind} m/s`, text: "Wind" },
        { img: "rain.svg", value: `${this.clouds}%`, text: "Chance of Rain" },
        {
          img: "preassure.svg",
          value: `${this.pressure} mbar`,
          text: "Pressure",
        },
        { img: "humidity.svg", value: `${this.humidity}%`, text: "Humidity" },
      ];
    },
    city() {
      return this.$store.state.city.name;
    },
  },
  watch: {
    city() {
      this.getWeather();
    },
  },
  methods: {
    getWeather() {
      this.isLoading=true
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=5&appid=a1fdf7cff87e36fa78044cf4606d87c0`
      )
        .then((res) => res.json())
        .then((position) => {
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position[0].lat}&lon=${position[0].lon}&appid=a1fdf7cff87e36fa78044cf4606d87c0`
          )
            .then((res) => res.json())
            .then((weather) => {
              this.description = weather.weather[0].description;
              this.temp = Math.floor(weather.main.temp - 270);
              this.clouds = weather.clouds.all;
              this.wind = weather.wind.speed;
              this.deg = weather.wind.deg;
              this.icon = weather.weather[0].icon;
              this.humidity = weather.main.humidity;
              this.pressure = weather.main.pressure;
              this.weather = weather;
              this.isLoading=false
            });
        });
    },
  },
  created() {
    let now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.day = days[now.getDay()];
    this.date = now.getDate();
    this.month = months[now.getMonth()];
    this.getWeather();
  },
  components:{TheLoading}
};
</script>

<style>
button {
  background: #7c99ac;
}
</style>