<template>
  <div
    class="menu-box"
    @click="showMenu = !showMenu"
    :class="showMenu ? '' : 'animation1'"
  ></div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      showMenu: true,
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.menu-box {
  width: 20%;
  height: 80vh;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 0 2%;
  margin-top: 4vh;
}
.animation1 {
  animation: myfirst 3s;
  -webkit-animation: myfirst 3s;
}
@keyframes myfirst {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.75;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.25;
  }
  100% {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

@-webkit-keyframes myfirst {
  0% {
    width: 100%;
    height: 100%;
  }
  25% {
    width: 75%;
    height: 75%;
  }
  50% {
    width: 50%;
    height: 50%;
  }
  75% {
    width: 25%;
    height: 25%;
  }
  100% {
    width: 0%;
    height: 0%;
  }
}
</style>