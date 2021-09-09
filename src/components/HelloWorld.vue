<template>
  <div class="outside-container">
    <div class="wel-container">
      <div class="logo"><img :src="logo" alt="" /></div>
      <div class="loading">Welcome to Lois'Space</div>
      <div class="visitor-name-input">
        <v-text-field
          background-color="rgba(234,216,244,0.51)"
          color="rgba(234,216,244)"
          label="Your name"
          v-model.trim="visitorName"
          :rules="rules"
          hide-details="auto"
        >
        </v-text-field>
      </div>
      <div class="next-btn" @click="jumpTo('/homepage')">Enter →</div>
    </div>
  </div>
</template>

<script>
import logo from "../assets/loisBlack.png";
import { mapState } from "vuex"
export default {
  name: "HelloWorld",
  data() {
    return {
      logo,
      visitorName: "",
      rules: [(value) => !!value || "Required."],
    };
  },
  mounted() {
    this.animation();
  },
  computed:{
    ...mapState({
      visitorInfo:state => state.visitorInfo
    })
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
    jumpTo(url) {
      if (this.visitorName) {
        this.$store.commit("SET_VISITOR_INFO", {
          name: this.visitorName,
          visitedTime: new Date(),
        });
        console.log(this.visitorInfo);
        this.$router.push(url);
      }
    },
  },
};
</script>

<style lang="scss" scope>
@import url(https://fonts.googleapis.com/css?family=Lato);
.outside-container {
  height: 100vh;
  .wel-container {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #9dc8c8;
    margin: 0;
    .logo {
      margin-bottom: 5vh;
    }
    .loading {
      color: black;
      letter-spacing: 1rem;
      font-size: 1.5rem;
      font-weight: 1000;
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
    .visitor-name-input {
      margin-top: 5vh;
    }
    .next-btn {
      cursor: pointer;
      letter-spacing: 0.5rem;
      font-size: 1rem;
      font-family: Lato, sans-serif;
      margin-top: 5vh;
      font-weight: 1000;
      color: black;
    }
  }
}
</style>
