<template>
  <div class="about-container">
    <div class="about-header">关于</div>
    <div class="about-body">
      <img class="avatar-img" :src="avatar" alt="" />
      <div class="info-container">
        <div>
          <span>乱七八糟说点啥。。。</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "../../../public/avatar.jpg"
export default {
  name: "index",
  data() {
    return {
      avatar
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.about-container {
  width: 100%;
  color: #2e294e;
  .about-header {
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    font-size: 20px;
    font-weight: 1000;
    background: #d1b6e17a;
    border-bottom: #d1b6e1 1px solid;
    padding: 0 1vw;
  }
  .about-body {
    padding: 0 1vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar-img {
      margin-top: 1vh;
      width: 10vw;
      height: 10vw;
      background-color: pink;
    }
    .info-container {
      text-align: left;
    }
  }
}
.about-container:hover {
  box-shadow: 0px 0px 10px #d2d2d2;
}
</style>