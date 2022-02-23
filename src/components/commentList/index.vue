<template>
  <div class="comments-container">
    <div
      class="comment-item"
      v-for="item in commentsList"
      :key="item.comment_id"
    >
      <div class="time">{{ item.created_time }}</div>
      <div class="test">
        <div class="base-info">
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="triangle_border_left"></div>
        <div class="comment-content">{{ item.comment_content }}</div>
      </div>
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
      this.getCommentById(this.articleId);
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
    // display: flex;
    // align-items: center;
    .test {
      display: flex;
      align-items: center;
      .base-info {
        margin: 1vh 1vw;
        font-size: 90%;
      }
      .triangle_border_left {
        width: 0;
        height: 0;
        border-width: 5px 5px 5px 0;
        border-style: solid;
        border-color: transparent #fff transparent transparent; /*透明 灰 透明 透明 */
        position: relative;
      }
      .comment-content {
        margin: 1vh 0;
        padding: 4px;
        border-radius: 5px;
        font-size: 80%;
        min-height: 4vh;
        background-color: #fff;
      }
    }
  }
}
</style>