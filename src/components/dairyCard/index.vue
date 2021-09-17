<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="title-box">
          <span class="title">{{ noteObj.title }}</span>
          <span class="date">{{ noteObj.create_time }}</span>
        </div>
        <v-btn color="#9c64a7" width="8vw" @click="showDetails()"> MORE </v-btn>
      </div>
      <div class="card-content">
        <div v-html="noteObj.content_html"></div>
      </div>
    </div>
    <div class="card-footer"></div>
    <noteDetails ref="details" :noteObj="noteObj"></noteDetails>
  </div>
</template>

<script>
import noteDetails from "../../components/noteDetails";
import testImg from "../../assets/test.jpg";

export default {
  name: "index",
  data() {
    return {
      testImg,
      htmlContent: "",
    };
  },
  components: {
    noteDetails,
  },
  props: ["noteObj"],
  mounted() {},
  methods: {
    showDetails() {
      this.$refs.details.showOverLay();
      console.log("show");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: 0;
  padding: 0;
  font-family: Lato;
  color: #2e294e;
  .card {
    width: 100%;
    // max-height: 50vh;
    padding: 2vh;
    margin-top: 3vh;
    margin-bottom: 3vh;
    // background: #fff;
    overflow: hidden;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-box {
        display: flex;
        align-items: baseline;
        .title {
          font-size: 36px;
          font-weight: 1000;
        }
        .date {
          font-family: Lato;
          color: #2e294e;
          margin-left: 1vw;
          font-size: 14px;
        }
      }
    }
    .card-content {
      padding: 1%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-top: 1px solid #d1b6e1;
      border-bottom: 1px solid #d1b6e1;
      .text-content {
        width: 80%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
      }
      // .details-img {
      //   width: 80%;
      //   height: 50%;
      // }
    }
    .card-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 90%;
      color: #000;
    }
  }
}
</style>