<template>
  <div class="img-container">
    <img class="img-not-found" src="../assets/404错误页面06.png" alt="404 找不到页面">
  </div>
</template>

<script>
export default {
  name: 'notFound',
  data() { 
    return { 

    }
  },
  props: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .img-not-found {
    width: 40%;
  }
}
</style>