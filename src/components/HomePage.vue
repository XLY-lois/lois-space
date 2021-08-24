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
      <dairyCard></dairyCard>
      <dairyCard></dairyCard>
      <dairyCard></dairyCard>
      <dairyCard></dairyCard>
      <v-btn
        class="to-top-btn"
        fab
        dark
        color="rgb(60 60 60 / 1)"
        @click="toTopFun()"
      >
        <img class="to-top-icon" :src="toTop" alt="" />
      </v-btn>
    </div>
  </div>
</template>

<script>
import logo from "../assets/loisWhite.png";
import toTop from "../assets/toTop.png";
import dairyCard from "../components/dairyCard";
export default {
  data() {
    return {
      logo,
      toTop,
    };
  },
  methods: {
    toTopFun() {
      scrollTo(0, 0);
    },
    jumpTo(url) {
      this.$router.push(url);
    },
  },
  components: {
    dairyCard,
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #222;
  margin: 0;
  justify-content: start;
  padding: 0;
  .header {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    color: white;
    background: #2c2c2c5c;
    box-shadow: 11px 11px 33px #121212, -11px -11px 33px #323232;
    .logo {
      margin: 1rem;
      height: 6vh;
      cursor: pointer;
    }
    .right-top {
      margin-right: 3vh;
      width: 10vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
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