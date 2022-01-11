<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="title-box">
          <v-text-field
            v-model.trim="articleObj.titleContent"
            label="标题"
            color="#9C64A7"
            class="title-input"
          >
          </v-text-field>
          <span class="date">{{ articleObj.time }}</span>
        </div>
      </div>
      <div class="card-content">
        <div id="div1"></div>
      </div>
      <div class="card-footer">
        <v-select
          v-model="selectedTag"
          class="tag-select"
          :items="tagList"
          item-text="text"
          item-value="id"
          label="标签"
          dense
          color="#9c64a7"
        ></v-select>
      </div>
      <v-btn class="submit-btn" color="#9c64a7" width="8vw" @click="submit">
        提交
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
        id: 0,
        titleContent: "",
        time: "",
        htmlContent: "",
        textContent: "",
      },
      tagList: ["Foo", "Bar", "Fizz", "Buzz"],
      selectedTag: "",
    };
  },
  props: {},
  mounted() {
    this.articleObj.time = this.getDate(new Date());

    const editor = new E("#div1");
    editor.config.uploadImgServer = "api/uploadImg";
    editor.create();
    if (this.$route.query.id) {
      this.queryArticleById(this.$route.query.id, editor);
    }
    this.editor = editor;

    this.queryTagList();
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
        id_tag: this.selectedTag,
      };
      if (this.$route.query.id) {
        const res = await this.$http
          .post("/api/editArticleById", this.articleObj)
          .then((res) => {
            if (res.status == 200) {
              this.$router.push("/admin");
            }
          });
      } else {
        const res = await this.$http
          .post("/api/addArticle", this.articleObj)
          .then((res) => {
            if (res.status == 200) {
              this.$router.push("/admin");
            }
          });
      }
    },
    async queryArticleById(id, editor) {
      const res = await this.$http
        .get("/api/queryArticleById", {
          params: { id },
        })
        .then((res) => {
          let result = res.data.data[0];
          this.articleObj = {
            ...this.articleObj,
            titleContent: result.title,
            id: result.id,
          };
          this.selectedTag = result.id_tag,
          editor.txt.html(res.data.data[0].content_html);
        });
    },
    async queryTagList() {
      const res = await this.$http.get("/api/getTagList").then((res) => {
        this.tagList = res.data.data;
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
  font-family: sans-serif;
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
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-box {
        width: 100%;
        display: flex;
        align-items: baseline;
        .date {
          font-family: sans-serif;
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
    .card-footer {
      margin-top: 2vh;
      .tag-select {
        width: 30%;
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