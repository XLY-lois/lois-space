<template>
  <div class="outside-container">
    <div class="wel-container">
      <div class="logo"><img :src="logo" alt="" /></div>
      <div class="loading">Welcome to Lois'Space</div>
      <v-form
        class="visitor-name-input"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          class="input"
          background-color="rgba(234,216,244,0.51)"
          color="rgba(234,216,244)"
          label="Your name"
          v-model.trim="visitorName"
          :rules="[rules.required]"
          hide-details="auto"
        >
        </v-text-field>
        <v-text-field
          class="input"
          background-color="rgba(234,216,244,0.51)"
          color="rgba(234,216,244)"
          label="Your email"
          v-model.trim="visitorEmail"
          :rules="[rules.required, rules.email]"
          hide-details="auto"
        >
        </v-text-field>
      </v-form>
      <div class="next-btn" @click="submit()">OK →</div>
    </div>
  </div>
</template>

<script>
import logo from "../assets/loisBlack.png";
import { mapState } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      valid: true,
      logo,
      visitorName: "",
      visitorEmail: "",
      ip: "",
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  mounted() {
    this.animation();
    this.checkStorage();
  },
  computed: {
    ...mapState({
      visitorInfo: (state) => state.visitorInfo,
    }),
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
    submit() {
      this.validate();
      this.setStorage()
      this.getVisitor();
    },
    jumpTo(url) {
      this.$router.push(url);
    },
    async getVisitor() {
      const res = await this.$http
        .get("/api/addVisitor", {
          params: {
            name: this.visitorName,
            email: this.visitorEmail,
          },
        })
        .then((res) => {
          this.ip = res.data.ip;
          this.$store.commit("SET_VISITOR_INFO", {
            name: this.visitorName,
            email: this.visitorEmail,
            ip: this.ip,
          });
          this.jumpTo("/homePage");
        });
    },
    checkStorage() {
      let storage = window.localStorage;
      if (storage.visitorName || storage.visitorEmail) {
        this.visitorName = storage.visitorName
        this.visitorEmail = storage.visitorEmail
      }

      // storage.setItem("c",3);

      // storage.removeItem("c");
    },
    setStorage() {
      let storage = window.localStorage;
      storage.setItem("visitorName", this.visitorName);
      storage.setItem("visitorEmail", this.visitorEmail);
      console.log(storage);
    },
    validate() {
      this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    reset() {
      this.$refs.form.reset();
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
      display: flex;
      .input {
        margin: 0 1vw;
      }
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
