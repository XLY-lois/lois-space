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
      <div class="menu-box">
        <a-menu
          style="width: 256px"
          :default-selected-keys="['1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-sub-menu key="sub1" @titleClick="titleClick">
            <span slot="title"
              ><a-icon type="mail" /><span>Navigation One</span></span
            >
            <a-menu-item-group key="g1">
              <template slot="title">
                <a-icon type="qq" /><span>Item 1</span>
              </template>
              <a-menu-item key="1"> Option 1 </a-menu-item>
              <a-menu-item key="2"> Option 2 </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group key="g2" title="Item 2">
              <a-menu-item key="3"> Option 3 </a-menu-item>
              <a-menu-item key="4"> Option 4 </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-sub-menu key="sub2" @titleClick="titleClick">
            <span slot="title"
              ><a-icon type="appstore" /><span>Navigation Two</span></span
            >
            <a-menu-item key="5"> Option 5 </a-menu-item>
            <a-menu-item key="6"> Option 6 </a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="7"> Option 7 </a-menu-item>
              <a-menu-item key="8"> Option 8 </a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title"
              ><a-icon type="setting" /><span>Navigation Three</span></span
            >
            <a-menu-item key="9"> Option 9 </a-menu-item>
            <a-menu-item key="10"> Option 10 </a-menu-item>
            <a-menu-item key="11"> Option 11 </a-menu-item>
            <a-menu-item key="12"> Option 12 </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="admin-content-box">
        <div class="article-list">
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
      current: ["mail"],
      openKeys: ["sub1"],
    };
  },
  mounted() {
    this.getArticleList();
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
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
    handleClick(e) {
      console.log("click", e);
    },
    titleClick(e) {
      console.log("titleClick", e);
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
    flex-direction: row;
    align-content: center;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    .menu-box {
      width: 20%;
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