<template>
  <div class="container">
    <div class="header">
      <img @click="jumpTo('/')" class="logo" :src="logo" alt="" />
      <div class="right-top">
        <span class="leaving-message">留言</span>
        <span class="about">关于</span>
        <span @click="jumpTo('loisAddPage')">发表</span>
      </div>
    </div>
    <div class="body">
      <dairyCard v-for="item in noteList" :key="item.id" :noteObj="item">
      </dairyCard>
      <v-btn class="to-top-btn" fab dark color="#D1B6E1" @click="toTopFun()">
        <img class="to-top-icon" :src="toTop" alt="" />
      </v-btn>
    </div>
  </div>
</template>

<script>
import logo from "../assets/loisBlack.png";
import toTop from "../assets/toTop.png";
import dairyCard from "../components/dairyCard";
import glassCard from "../components/glassCard";
export default {
  data() {
    return {
      logo,
      toTop,
      noteList: [],
      curPreview: {},
    };
  },
  components: {
    dairyCard,
    glassCard,
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
      const res = await this.$http.get("/api/queryAllArticles").then((res) => {
        this.noteList = res.data.data;
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
      font-family: Lato;
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
  }
}
</style>