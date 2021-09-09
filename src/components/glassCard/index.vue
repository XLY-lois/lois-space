<template>
  <div class="bg">
    <div class="g-backdrop-filter">毛玻璃特效</div>
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
.bg {
  background-repeat: no-repeat;
  height: 1000px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .bg .g-backdrop-filter {
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(6px);
  }
}
</style>