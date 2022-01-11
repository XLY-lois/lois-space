<template>
  <div class="weather-container" v-if="this.weatherInfo">
    <div class="weather-header">
      {{ this.weatherInfo.city }}
    </div>
    <div class="weather-body">
      <div class="tempera">{{ this.weatherInfo.realtime.temperature }}℃</div>
      <img :src="icon" alt="" />
      <div class="weather-info">
        {{ this.weatherInfo.realtime.info }}
      </div>
      <div class="wind">
        {{
          this.weatherInfo.realtime.direct +
          "  " +
          this.weatherInfo.realtime.power
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "index",
  data() {
    return {
      local: "",
      weatherInfo: {
        city: "",
        realtime: {
          temperature: "",
          humidity: "",
          info: "",
          wid: "",
          direct: "",
          power: "",
          aqi: "",
        },
      },
      icon: "",
    };
  },
  computed: {
    ...mapState({
      visitorInfo: (state) => state.visitorInfo,
    }),
  },
  props: {},
  watch: {
    local(val, oldVal) {
    },
  },
  mounted() {
    this.getWeatherByIp(this.visitorInfo.ip);
    // this.getWeatherIcon()
  },
  methods: {
    async getWeatherByIp(ip) {
      const res = await this.$http
        .get("api/getWeatherByIp", {
          params: {
            ip,
          },
        })
        .then((res) => {
          let data = JSON.parse(res.data.data);
          this.weatherInfo = data.result;
        });
    },
    getWeatherIcon(info) {
      //TODO对应图标
      let url = "../../assets/weatherIcon/baoxue.png";
      let url2 = url + "";
      this.icon = require(`${url}`);
      console.log(this.icon);
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-container {
  height: 20vh;
  width: 100%;
  color: #2e294e;
  padding: 2vh;
  .weather-header {
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    font-size: 20px;
    font-weight: 1000;
    background: #d1b6e17a;
    border-bottom: #d1b6e1 1px solid;
    padding: 0 1vw;
  }
  .weather-body {
    padding: 0 1vw;
    .tempera {
      font-size: 4vh;
      font-weight: 600;
      color: #2e294ea2;
    }
    .weather-info {
    }
    .wind {
      display: flex;
      justify-content: flex-end;
    }
  }
}
.weather-container:hover {
  box-shadow: 0px 0px 10px #d2d2d2;
}
</style>