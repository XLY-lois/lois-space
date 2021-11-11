<template>
  <div class="container">
    <div class="header">
      <img @click="jumpTo('/')" class="logo" :src="logo" alt="" />
      <div class="right-top">
        <span class="leaving-message">留言</span>
        <span class="about">关于</span>
        <span @click.stop="dialog = true">后台</span>
      </div>
    </div>
    <div class="body">
      <dairyCard
        v-for="item in noteList"
        :key="item.id"
        :noteObj="item"
        @changeShowStatus="changeShowStatus"
      >
      </dairyCard>
      <WeatherCard class="weather-card"></WeatherCard>
      <v-btn class="to-top-btn" fab dark color="#D1B6E1" @click="toTopFun()">
        <img class="to-top-icon" :src="toTop" alt="" />
      </v-btn>
    </div>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="50%"
    >
      <v-card>
        <v-toolbar color="#9C64A7" dark>确认您的身份</v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">
            <v-text-field
              label="ID"
              :rules="rules"
              hide-details="auto"
              v-model="identityObj.id"
            ></v-text-field>
            <v-text-field
              label="PASSWORD"
              :rules="rules"
              v-model="identityObj.password"
              type="password"
            ></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn text @click="identity()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import logo from "../assets/loisBlack.png";
import toTop from "../assets/toTop.png";
import dairyCard from "../components/dairyCard";
import glassCard from "../components/glassCard";
import { mapState } from "vuex";
import WeatherCard from "../components/weather";

export default {
  data() {
    return {
      logo,
      toTop,
      noteList: [],
      curPreview: {},
      dialog: false,
      identityObj: {
        id: "",
        password: "",
      },
      rules: [(value) => !!value || "Required."],
    };
  },
  components: {
    dairyCard,
    glassCard,
    WeatherCard,
  },
  computed: {
    ...mapState({
      visitorInfo: (state) => state.visitorInfo,
    }),
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    toTopFun() {
      scrollTo(0, 0);
    },
    jumpTo(url) {
      this.$router.push(url);
    },
    async getArticleList() {
      let res = await this.$http.get("/api/queryAllArticles").then((res) => {
        res.data.data.forEach((element) => {
          element.isFold = true;
        });
        this.noteList = res.data.data;
      });
    },
    identity() {
      if (
        this.identityObj.id == "123456" &&
        this.identityObj.password == "123456"
      ) {
        this.jumpTo("admin");
      }
      this.identityObj = {
        id: "",
        password: "",
      };
      this.dialog = false;
    },
    changeShowStatus(id) {
      this.noteList.forEach((ele) => {
        if (ele.id == id) {
          ele.isFold = !ele.isFold;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  margin: 0;
  justify-content: start;
  padding: 0;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 8vh;
    width: 100%;
    padding: 0;
    margin: 0;
    background: #9dc8c8;
    .logo {
      margin: 1rem;
      height: 6vh;
      cursor: pointer;
    }
    .right-top {
      margin-right: 1vw;
      width: 12vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: sans-serif;
      color: #2e294e;
      font-weight: 1000;
      font-size: 14px;
      letter-spacing: 0.4vw;
      span {
        cursor: pointer;
      }
    }
  }
  .body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .to-top-btn {
      position: fixed;
      bottom: 3vh;
      right: 3vh;
      .to-top-icon {
        width: 4vh;
        height: 4vh;
      }
    }
    .weather-card {
      width: 16vw;
      position: absolute;
      top: 13vh;
      left: 3vh;
    }
  }
}
</style>