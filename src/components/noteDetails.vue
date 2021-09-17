<template>
  <div class="note-details">
    <v-overlay :value="overlay">
      <div class="details-card">
        <div class="details-header">
          <h1>{{ noteObj.title }}</h1>
        </div>
        <div class="details-content">
          <!-- <img class="details-img" :src="testImg" alt=""> -->
          <div v-html="noteObj.content_html"></div>
        </div>
        <div class="details-footer">
          <v-btn color="#9c64a7" @click="overlay = false"> hide </v-btn>
        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import testImg from "../assets/test.jpg";
export default {
  name: "noteDetails",
  data() {
    return {
      overlay: false,
      testImg,
    };
  },
  props: ["noteObj"],

  methods: {
    hideOverLay() {
      this.overlay = false;
    },
    showOverLay() {
      this.overlay = true;
    },
  },
  watch: {
    overlay(val) {},
    curPreview(val) {
      console.log(this.curPreview);
      this.overlay = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.note-details {
  width: 100%;
  .details-card {
    position: relative;
    padding: 2vw;
    border-radius: 2px;
    width: 80vw;
    height: 80vh;
    background-color: #fff;
    opacity: 0.95;
    color: black;
    overflow: auto;
    .details-header {
      border-bottom: 1px solid #9d8fa0af;
      margin-bottom: 2vh;
    }
    .details-content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .details-img {
        width: 80%;
      }
    }
    .details-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>