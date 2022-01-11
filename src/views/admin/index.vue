<template>
  <div class="admin-container">
    <div class="header">
      <img @click="jumpTo('/')" class="logo" :src="logo" alt="" />
      <div class="right-top">
        <img
          class="back-icon"
          :src="backIcon"
          alt=""
          @click="jumpTo('back', 'homePage')"
        />
      </div>
    </div>
    <div class="admin-body">
      <div class="menu-box" style="width: 256px">
        <a-button
          type="primary"
          style="margin-bottom: 2vh"
          @click="toggleCollapsed"
        >
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <a-menu
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          mode="inline"
          :inline-collapsed="collapsed"
          @select="handleSelect"
        >
          <a-menu-item key="1">
            <a-icon type="pie-chart" />
            <span>内容</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="desktop" />
            <span>静态资源</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="inbox" />
            <span>访客</span>
          </a-menu-item>
          <!-- <a-sub-menu key="sub1">
            <span slot="title"
              ><a-icon type="mail" /><span>不知道</span></span
            >
            <a-menu-item key="5"> Option 5 </a-menu-item>
            <a-menu-item key="6"> Option 6 </a-menu-item>
          </a-sub-menu> -->
        </a-menu>
      </div>
      <div class="admin-content-box">
        <div v-if="curSelectItem == '1'" class="article-list">
          <div class="btn-group">
            <v-btn class="btn" @click="delArticleById" color="#ffb6b9" dark>
              删除
            </v-btn>
            <v-btn
              class="btn"
              color="#bbded6"
              dark
              @click="jumpTo('add', '/loisAddPage')"
              >新增</v-btn
            >
            <v-btn
              class="btn"
              color="#8ac6d1"
              dark
              @click="jumpTo('edit', '/loisAddPage', selected[0].id)"
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
    </div>
  </div>
</template>


<script>
import backIcon from "../../assets/back.png";
import logo from "../../assets/loisBlack.png";

export default {
  data() {
    return {
      singleSelect: false,
      logo,
      selected: [], //选择的文章列表
      headers: [
        { text: "标题", value: "title" },
        { text: "创建时间", value: "create_time" },
        { text: "最后一次修改时间", value: "last_edit_time" },
      ],
      desserts: [], //文章列表
      backIcon,
      collapsed: false,
      curSelectItem: 1
    };
  },
  mounted() {
    this.getArticleList();
  },
  watch: {
  },
  methods: {
    jumpTo(type, url, id) {
      if (type === "edit") {
        //TODO 处理不选择内容但点击编辑的情况
        if (id) {
          this.$router.push({
            path: url,
            query: {
              id,
            },
          });
        }
      } else {
        this.$router.push(url);
      }
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
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    handleSelect(e) {
      this.curSelectItem = e.key
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
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6vh;
    width: 100%;
    padding: 0;
    margin: 0;
    background: rgba(255, 255, 255, 0.7);
    .back-icon {
      cursor: pointer;
      width: 1.5vw;
      height: 1.5vw;
      margin: 1vh 1vw;
    }
    .logo {
      margin: 1rem;
      height: 6vh;
      cursor: pointer;
    }
    .right-top {
      margin-right: 1vw;
      width: 4vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: sans-serif;
      color: #2e294e;
      font-weight: 1000;
      font-size: 80%;
      letter-spacing: 0.4vw;
      span {
        cursor: pointer;
      }
    }
  }
  .admin-head {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .admin-body {
    width: 100%;
    display: flex;
    .menu-box {
      margin-top: 5vh;
      margin-right: 5vw;
      .ant-btn-primary{
        background-color: #444693;
        border-color: #444693;
      }
      .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
        background-color: #afb4db3b;
      }
      .ant-menu-vertical 
      .ant-menu-item::after, 
      .ant-menu-vertical-left 
      .ant-menu-item::after, 
      .ant-menu-vertical-right 
      .ant-menu-item::after, 
      .ant-menu-inline 
      .ant-menu-item::after {
        border-right: 3px solid #444693;
      }
    }
    .admin-content-box {
      width: 80%;
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
  }
}
</style>