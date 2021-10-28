<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="title-box">
          <span class="title">{{ noteObj.title }}</span>
          <span class="date">{{ noteObj.create_time }}</span>
        </div>
      </div>
      <div class="card-content">
        <div
          class="html-content"
          :class="noteObj.isFold ? 'fold' : ''"
          v-html="noteObj.content_html"
          ref="article"
        ></div>
        <div v-show="!noteObj.isFold">
          <CommentCard :articleId="noteObj.id" ref="comment"></CommentCard>
        </div>
        <div class="fold-open" @click="changeShowStatus(noteObj.id)">
          <div v-show="noteObj.isFold">展开</div>
          <div v-show="!noteObj.isFold">收起</div>
        </div>
      </div>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
import CommentCard from '../commentCard'
export default {
  name: "index",
  data() {
    return {
      htmlContent: "",
    };
  },
  components: {
    CommentCard
  },
  filters: {},
  props: {
    noteObj: {
      type: Object,
    },
  },
  mounted() {},
  methods: {
    changeShowStatus(id) {
      this.$refs.comment.resetValidation()
      this.$emit("changeShowStatus", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 60%;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: #2e294e;
  .card {
    width: 100%;
    padding: 2vh;
    margin-top: 3vh;
    margin-bottom: 3vh;
    overflow: hidden;
    .card-header {
      display: flex;
      align-items: center;
      background: #d1b6e17a;
      padding: 0 1vw;
      .title-box {
        width: 100%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        .title {
          font-size: 36px;
          font-weight: 1000;
        }
        .date {
          font-family: sans-serif;
          color: #2e294e;
          margin-left: 1vw;
          font-size: 14px;
        }
      }
    }
    .card-content {
      border-top: 1px solid #d1b6e1;
      border-bottom: 1px solid #d1b6e1;
      .fold {
        // max-height: 45vh;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 10;
        overflow: hidden;
      }
      .html-content {
        padding: 2vh 1vw 0 1vw;
      }
      .fold-open {
        margin: 1% 0;
        display: flex;
        justify-content: flex-end;
        div {
          margin: 0 1vw;
          cursor: pointer;
        }
      }
     
    }
    .card-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 90%;
      color: #000;
    }
  }
  .card:hover {
    box-shadow: 0px 0px 10px #d2d2d2;
  }
}
</style>