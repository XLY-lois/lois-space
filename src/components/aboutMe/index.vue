<template>
  <div class="about-container">
    <div class="about-header">关于</div>
    <div class="about-body">body</div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.about-container {
  height: 20vh;
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
  }
}
.about-container:hover {
  box-shadow: 0px 0px 10px #d2d2d2;
}
</style>