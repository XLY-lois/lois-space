<template>
  <div class="container">
    <div class="header">
      <img class="logo" :src="logo" alt="" />
      <div class="right-top">
        <span>留言</span>
        <span>关于</span>
      </div>
    </div>
    <div class="body">
      <dairyCard></dairyCard>
    </div>
  </div>
</template>

<script>
import logo from "../assets/loisWhite.png";
import dairyCard from "../components/dairyCard"
export default {
  data() {
    return {
      logo,
    };
  },
  components:{
    dairyCard
  }
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
    .logo {
      margin: 1rem;
      height: 6vh;
    }
    .right-top {
      margin-right: 5vh;
      width: 10vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }
  }
  .body {
    width: 80%;
  }
}
</style>