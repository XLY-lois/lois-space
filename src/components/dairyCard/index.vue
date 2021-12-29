<template>
  <div class="card-container">
    <div class="card">
      <div class="card-header">
        <div class="title-box">
          <div class="title">
            <span>
              {{ noteObj.title }}
            </span>
            <span class="article-tags">
              <v-chip
                close-icon="mdi-close-outline"
                :color="noteObj.color_tag"
                label
                small
                text-color="white"
              >
                {{ noteObj.name_tag }}
              </v-chip>
            </span>
          </div>
          <span class="date">{{ noteObj.create_time }}</span>
        </div>
      </div>
      <div class="card-content">
        <div
          class="html-content"
          :class="noteObj.isFold ? 'fold' : ''"
          v-html="noteObj.content_html"
        ></div>
        <CommentList
          v-if="!noteObj.isFold"
          :articleId="noteObj.id"
        ></CommentList>
        <CommentCard
          v-show="!noteObj.isFold"
          :articleId="noteObj.id"
        ></CommentCard>

        <div class="fold-open" @click="changeShowStatus(noteObj.id)">
          <img 
            class="operation-icon"
            v-show="noteObj.isFold" 
            :src="openIcon" 
            alt="展开" 
          />
          <img 
            class="operation-icon"
            v-show="!noteObj.isFold" 
            :src="foldIcon" 
            alt="收起" 
          />
        </div>
      </div>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
import openIcon from "../../assets/openDown.png";
import foldIcon from "../../assets/foldUp.png";
import CommentCard from "../commentCard";
import CommentList from "../commentList";
export default {
  name: "index",
  data() {
    return {
      openIcon,
      foldIcon,
      htmlContent: "",
      isFold: true,
    };
  },
  components: {
    CommentCard,
    CommentList,
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
      this.$emit("changeShowStatus", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: #2e294e;
  .card {
    width: 100%;
    padding: 2vh;
    // margin-top: 3vh;
    margin-bottom: 3vh;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // background: #d1b6e17a;
      height: 4vh;
      padding: 0 1vw;
      .title-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .title {
          display: flex;
          align-items: center;
          font-size: 80vw;
          font-weight: 500;
          .article-tags {
            margin-left: 1vw;
            display: flex;
            align-items: center;
          }
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
        max-height: 44vh;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 12;
        overflow: hidden;
      }
      .html-content {
        padding: 2vh 1vw 0 1vw;
      }
      .fold-open {
        margin: 1% 0;
        display: flex;
        justify-content: flex-end;
        .operation-icon {
          width: 1.5vw;
          height: 1.5vw;
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