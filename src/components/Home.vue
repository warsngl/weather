<template lang='pug'>
.flex.flex-col.items-center.justify-center(v-if="weather")
  .flex
    p.mr-3 {{ city }}
    svg.w-4.cursor-pointer(@click='isFavour=!isFavour' viewBox="0 0 512 512")
      path(:fill="isFavour?'red':'white'" d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z")
  img(:src="'http://openweathermap.org/img/wn/' + icon + '@2x.png'")
  p {{ day }} | {{ month }} {{ date }}
  p.text-2xl {{ temp }}°
  p {{ description }}
  br
  .flex.flex-wrap.w-96
    .flex.items-center.px-5(class="w-1/2", v-for="o in options")
      img.w-8.h-8(
        :src="'./src/assets/' + o.img",
        :style="o.img == 'navigation.png' ? `transform:rotate(${deg}deg)` : null"
      )
      .pl-2
        p {{ o.val }}
        p {{ o.text }}
</template>

<script>
export default {
  data: () => ({
    isFavour:false,
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
  }),
  computed: {
    options() {
      return [
        { img: "navigation.png", val: `${this.wind} m/s`, text: "Wind" },
        { img: "rain.svg", val: `${this.clouds}%`, text: "Chance of Rain" },
        {
          img: "preassure.svg",
          val: `${this.pressure} mbar`,
          text: "Pressure",
        },
        { img: "humidity.svg", val: `${this.humidity}%`, text: "Humidity" },
      ];
    },
    city() {
      return this.$store.state.city;
    },
  },
  watch: {
    city() {
      this.getWeather();
    },
  },
  methods: {
    async getWeather() {
      const w = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=5&appid=a1fdf7cff87e36fa78044cf4606d87c0`
      ).then((data) => data.json());
      const we = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${w[0].lat}&lon=${w[0].lon}&appid=a1fdf7cff87e36fa78044cf4606d87c0`
      ).then((data) => data.json());
      this.description = we.weather[0].description;
      this.temp = Math.floor(we.main.temp - 270);
      this.clouds = we.clouds.all;
      this.wind = we.wind.speed;
      this.deg = we.wind.deg;
      this.icon = we.weather[0].icon;
      this.humidity = we.main.humidity;
      this.pressure = we.main.pressure;
      this.weather = we;
      console.log(we);
    },
  },
  async created() {
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
    await this.getWeather();
  },
};
</script>

<style>
button {
  background: #7c99ac;
}
</style>