<template>
  <div>
    <v-textarea
      color="#d1b6e1"
      clearable
      outlined
      label="要不说点什么？"
      v-model="commentObj.content"
    ></v-textarea>
    <v-form class="visitor-info" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        class="info-input"
        color="#d1b6e1"
        label="你叫什么名字？"
        v-model="commentObj.name"
        :rules="[rules.required]"
      >
      </v-text-field>
      <v-text-field
        class="info-input"
        color="#d1b6e1"
        label="留个邮箱呗！"
        v-model="commentObj.email"
        :rules="[rules.required, rules.email]"
      >
      </v-text-field>
    </v-form>
    <div class="operation">
      <v-switch color="#9dc8c8" v-model="rememberMe" label="记住我的信息">
      </v-switch>
      <v-btn outlined color="#d1b6e1" @click="submitComment"> 好了 </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      valid: true,
      commentObj: {
        content: "",
        name: "",
        email: "",
        articleId: "",
      },
      rememberMe: false,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  props: {
    articleId: {
      type: Number,
    },
  },
  mounted() {
    this.commentObj.articleId = this.articleId;
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    reset() {
      this.commentObj.content = ''
      this.$refs.form.reset();
    },
    async submitComment() {
      // const res = await this.$http
      //   .post("/api/addCommentByArticleId", this.commentObj)
      //   .then((res) => {
      //     console.log(res);
      //   });
      this.reset();
      this.resetValidation();
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