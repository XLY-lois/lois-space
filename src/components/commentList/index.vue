<template>
  <div class="comments-container">
    <div
      class="comment-item"
      v-for="item in commentsList"
      :key="item.comment_id"
    >
      <div class="base-info">
        <span class="name">{{ item.name }} 说：</span>
        <span class="time">{{ item.created_time }}</span>
      </div>
      <div class="comment-content">{{ item.comment_content }}</div>
    </div>
  </div>
</template>

<script>
import Bus from "../../bus";
export default {
  name: "index",
  data() {
    return {
      commentsList: [],
    };
  },
  props: {
    articleId: {
      type: Number,
    },
  },
  mounted() {
    this.getCommentById(this.articleId);
    Bus.$on("refreshCommentsList", (target) => {
      this.getCommentById(this.articleId)
    });
  },
  methods: {
    async getCommentById(id) {
      const res = await this.$http
        .get("/api/getCommentById", {
          params: { id },
        })
        .then((res) => {
          this.commentsList = res.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.comments-container {
  margin: 2vh 0;
  border-top: #00000036 1px solid;
  .comment-item {
    color: #00000094;
    margin-top: 2vh;
    .base-info {
      display: flex;
      justify-content: space-between;
      margin: 1vh 1vw;
      font-size: 90%;
    }
    .comment-content {
      margin: 1vh 1vw;
      font-size: 80%;
    }
  }
}
</style>