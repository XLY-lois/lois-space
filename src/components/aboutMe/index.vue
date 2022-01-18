<template>
  <div class="about-container">
    空白的关于页
  </div>
</template>

<script>
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 76vh;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 0 2%;
  }
.about-container:hover {
  box-shadow: 0px 0px 10px #d2d2d2;
}
</style>