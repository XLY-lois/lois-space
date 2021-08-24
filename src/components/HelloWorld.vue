<template>
  <div class="wel-container">
    <div><img :src="logo" alt=""></div>
    <div class="loading">Welcome to Lois'Space</div>
    <div class="next-btn" @click="jumpTo('/homepage')">Enter →</div>
  </div>
</template>

<script>
import logo from "../assets/loisWhite.png";
export default {
  name: "HelloWorld",
  data() {
    return {
      logo,
    };
  },
  mounted() {
    this.animation();
  },
  methods: {
    animation() {
      let loading = document.querySelector(".loading");
      let letters = loading.textContent.split("");
      loading.textContent = "";
      letters.forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.animationDelay = `${i / 5}s`;
        loading.append(span);
      });
    },
    jumpTo(url){
      this.$router.push(url)
    }
  },
};
</script>

<style lang="scss" scope>
@import url(https://fonts.googleapis.com/css?family=Lato);

.wel-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #222;
  margin: 0;
  .loading {
    color: white;
    letter-spacing: 1rem;
    font-size: 1.5rem;
    font-family: Lato, sans-serif;
    text-transform: uppercase;

    span {
      animation: blur 3s alternate infinite;
    }
  }
  @keyframes blur {
    to {
      filter: blur(5px);
    }
  }
  .next-btn {
    cursor: pointer;
    letter-spacing: 0.5rem;
    font-size: 1rem;
    font-family: Lato, sans-serif;
    margin-top: 5vh;
    color: #fff;
  }
}
</style>
