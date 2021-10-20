<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="title-box">
          <v-text-field
            v-model.trim="articleObj.titleContent"
            label="title"
            color="#9C64A7"
          >
          </v-text-field>
          <span class="date">{{ articleObj.time }}</span>
        </div>
      </div>
      <div class="card-content">
        <div id="div1"></div>
      </div>
      <div class="card-footer"></div>
      <v-btn class="submit-btn" color="#9c64a7" width="8vw" @click="submit">
        SUBMIT
      </v-btn>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "loisAddPage",
  data() {
    return {
      articleObj: {
        titleContent: "",
        time: "",
        htmlContent: "",
        textContent: "",
      },
    };
  },
  props: {},
  mounted() {
    const editor = new E("#div1");
    editor.create();
    this.editor = editor;
    this.articleObj.time = this.getDate(new Date());
  },
  methods: {
    getDate(time) {
      let date = `${time.getFullYear()}-${
        time.getMonth() + 1
      }-${time.getDate()}`;
      return date;
    },
    async submit() {
      this.articleObj = {
        ...this.articleObj,
        htmlContent: this.editor.txt.html(),
        textContent: this.editor.txt.text(),
      };
      const res = await this.$http
        .post("/api/addArticle", this.articleObj)
        .then((res) => {
          console.log(res)
        });
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: Lato;
  color: #2e294e;
  display: flex;
  justify-content: center;
  .card {
    position: relative;
    width: 80%;
    padding: 2vh;
    margin-top: 3vh;
    margin-bottom: 3vh;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-box {
        display: flex;
        align-items: baseline;
        .date {
          font-family: Lato;
          color: #2e294e;
          margin-left: 1vw;
          font-size: 14px;
        }
      }
    }
    .card-content {
      padding: 5vh 2vw;
      border-top: 1px solid #d1b6e1;
      border-bottom: 1px solid #d1b6e1;
      overflow: hidden;
      .details-img {
        width: 50%;
      }
    }
    .submit-btn {
      position: absolute;
      bottom: -3vh;
      right: 2vw;
    }
  }
}
</style>