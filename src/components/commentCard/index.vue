<template>
  <div>
    <v-textarea
      color="#d1b6e1"
      clearable
      outlined
      label="要不说点什么？"
      v-model="commentObj.content"
    ></v-textarea>
    <div class="operation">
      <v-btn outlined color="#d1b6e1" @click="submitComment"> 好了 </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "index",
  data() {
    return {
      commentObj: {
        content: "",
        articleId: "",
      },
    };
  },
  props: {
    articleId: {
      type: Number,
    },
  },
  computed: {
    ...mapState({
      visitorInfo: (state) => state.visitorInfo,
    }),
  },
  mounted() {
    this.commentObj.articleId = this.articleId;
  },
  methods: {
    async submitComment() {
      console.log(this.visitorInfo);
        const res = await this.$http
          .post("/api/addCommentByArticleId", {
              ...this.commentObj,
              name:this.visitorInfo.name,
              email:this.visitorInfo.email
          })
          .then((res) => {
            console.log(res);
          });
    },
  },
};
</script>

<style lang="scss" scoped>
.visitor-info {
  display: flex;
  .info-input {
    margin: 0 1vw;
  }
}
.operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vh 1vw;
}
</style>