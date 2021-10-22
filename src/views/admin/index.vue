<template>
  <div class="admin-container">
    <div class="admin-head">
      <img
        class="back-icon"
        :src="backIcon"
        alt=""
        @click="jumpTo('homePage')"
      />
    </div>
    <div class="article-list">
      <div class="btn-group">
        <v-btn class="btn" @click="delArticleById" color="#ffb6b9" dark>
          删除
        </v-btn>
        <v-btn class="btn" color="#bbded6" dark @click="jumpTo('/loisAddPage')"
          >新增</v-btn
        >
        <v-btn
          class="btn"
          color="#8ac6d1"
          dark
          @click="jumpTo('/loisAddPage', selected[0].id)"
          >编辑</v-btn
        >
      </div>
      <template>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="desserts"
          :items-per-page="10"
          class="elevation-1"
          show-select
          :single-select="singleSelect"
          item-key="id"
        ></v-data-table>
      </template>
    </div>
  </div>
</template>


<script>
import backIcon from "../../assets/back.png";
export default {
  data() {
    return {
      singleSelect: false,
      selected: [], //选择的文章列表
      headers: [
        { text: "标题", value: "title" },
        // { text: "文本内容", value: "content_text" },
        // { text: "html内容", value: "content_html" },
        { text: "创建时间", value: "create_time" },
      ],
      desserts: [], //文章列表
      backIcon,
    };
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    jumpTo(url, id) {
      this.$router.push({
        path: url,
        query: {
          id
        },
      });
    },
    async getArticleList() {
      const res = await this.$http.get("/api/queryAllArticles").then((res) => {
        this.desserts = res.data.data;
      });
    },
    async delArticleById() {
      let idArr = [];
      this.selected.forEach((element) => {
        idArr.push(element.id);
      });
      const res = await this.$http
        .post("/api/delArticleById", { idArr })
        .then((res) => {
          if (res.status == 200) {
            alert("删除成功");
            this.getArticleList();
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-container {
  width: 100%;
  height: 100%;
  background-color: #fff7f7;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  .admin-head {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .back-icon {
      width: 1.5vw;
      height: 1.5vw;
      margin: 1vh 1vw;
    }
  }
  .article-list {
    margin-top: 5vh;
    width: 80%;
    .btn-group {
      margin: 2vh 0;
      display: flex;
      justify-content: flex-end;
      .btn {
        margin: 0 0.5vw;
      }
    }
  }
}
</style>