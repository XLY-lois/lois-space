<template>
  <div class="container">
    <div class="header">
      <img @click="jumpTo('/')" class="logo" :src="logo" alt="" />
      <div class="right-top">
        <span @click.stop="dialog = true">后台</span>
      </div>
    </div>
    <div class="body">
      <div class="main-box">
        <MenuBox></MenuBox>
        <div class="content-box">
          <dairyCard
            v-for="item in noteList"
            :key="item.id"
            :noteObj="item"
            @changeShowStatus="changeShowStatus"
          >
          </dairyCard>
        </div>
      </div>

      <!-- <WeatherCard class="weather-card"></WeatherCard> -->
      <!-- <AboutMe class="about-me"></AboutMe> -->
      <!-- TODO 关于我待开发 -->
      <v-btn class="to-top-btn" fab dark color="#D1B6E1" @click="toTopFun()">
        <img class="to-top-icon" :src="toTop" alt="" />
      </v-btn>
      <div class="show-menu-btn"></div>
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
import { mapState } from "vuex";
import WeatherCard from "../components/weather";
import AboutMe from "../components/aboutMe";
import MenuBox from "../components/menuBox";

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
    WeatherCard,
    MenuBox,
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
  background-color: #d8d8d8;
  margin: 0;
  justify-content: start;
  padding: 0;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6vh;
    width: 100%;
    padding: 0;
    margin: 0;
    background: rgba(255, 255, 255, 0.7);
    .logo {
      margin: 1rem;
      height: 6vh;
      cursor: pointer;
    }
    .right-top {
      margin-right: 1vw;
      width: 4vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: sans-serif;
      color: #2e294e;
      font-weight: 1000;
      font-size: 80%;
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
    .main-box {
      width: 70%;
      display: flex;
      .content-box {
        flex: 1;
        margin: 0 2%;
        margin-top: 4vh;
      }
    }
    .to-top-btn {
      position: fixed;
      bottom: 3vh;
      right: 3vh;
      .to-top-icon {
        width: 4vh;
        height: 4vh;
      }
    }
    .show-menu-btn {
      position: fixed;
      width: 30px;
      height: 30px;
      background-color: pink;
      top: 12vh;
      left: 3vh;
    }
    .weather-card {
      width: 16vw;
      position: absolute;
      top: 11vh;
      left: 3vh;
    }
    .about-me {
      width: 16vw;
      position: absolute;
      top: 11vh;
      right: 3vh;
      padding: 2vh;
    }
  }
}
</style>