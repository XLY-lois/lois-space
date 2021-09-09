<template>
  <div class="container">
    <div class="header">
      <img @click="jumpTo('/')" class="logo" :src="logo" alt="" />
      <div class="right-top">
        <span>留言</span>
        <span>关于</span>
      </div>
    </div>
    <div class="body">
      <!-- <glassCard></glassCard> -->
      <dairyCard v-for="item in noteList" :key="item.title" :noteObj="item">
      </dairyCard>
      <v-btn class="to-top-btn" fab dark color="#D1B6E1" @click="toTopFun()">
        <img class="to-top-icon" :src="toTop" alt="" />
      </v-btn>
    </div>
    <span @click="jumpTo('loisAddPage')">发表</span>
  </div>
</template>

<script>
import logo from "../assets/loisBlack.png";
import toTop from "../assets/toTop.png";
import dairyCard from "../components/dairyCard";
import glassCard from "../components/glassCard";
// import noteDetails from "../components/noteDetails"
export default {
  data() {
    return {
      logo,
      toTop,
      noteList: "",
      curPreview: {},
    };
  },
  components: {
    dairyCard,
    // noteDetails
    glassCard,
  },
  mounted() {
    this.getNoteList();
  },
  methods: {
    toTopFun() {
      scrollTo(0, 0);
    },
    jumpTo(url) {
      this.$router.push(url);
    },
    async getNoteList() {
      await this.$http.get("/getNoteList").then((res) => {
        this.noteList = res.data.noteList;
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
      margin-right: 2vw;
      width: 8vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: Lato;
      color: #2e294e;
      font-weight: 1000;
      font-size: 1vw;
      letter-spacing: 0.5vw;
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