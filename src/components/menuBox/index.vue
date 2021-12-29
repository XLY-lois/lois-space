<template>
  <div class="menu-box" :class="menuClass">
    <div class="menu-header">
      <img :src="foldIcon" alt="收起" class="fold-btn" @click="hideMenu" />
    </div>
    <div class="menu-body">
      <v-treeview
        :items="menuList"
        item-text="class_name"
        activatable
        hoverable
        rounded
        :active.sync="active"
        color="rgb(62 118 118)"
      >
      </v-treeview>
    </div>
  </div>
</template>

<script>
import foldIcon from "../../assets/fold.png";
export default {
  name: "index",
  data() {
    return {
      menuClass: [], //菜单样式
      foldIcon,
      menuList: [],
      active: [], // 当前活动的菜单id
    };
  },
  mounted() {
    this.getMenuList();
  },
  watch: {
    active: {
      handler(val) {
        this.$emit("update:curSelectedOption", val[0]-1);
      },
      deep: true,
    },
  },
  props: {
    menuStatus: {
      type: Boolean,
    },
    curSelectedOption: {
      type: Number
    }
  },
  methods: {
    hideMenu() {
      this.$emit("update:menuStatus", false);
      this.menuClass = ["animation1"];
      setTimeout(() => {
        this.menuClass.push("hide-menu");
      }, 1000);
    },
    showMenu() {
      this.menuClass = [];
      this.$emit("update:menuStatus", true);
    },
    async getMenuList() {
      let res = await this.$http
        .get("/api/getClassificationList")
        .then((res) => {
          console.log(res.data);
          this.menuList = res.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-box {
  width: 20%;
  height: 80vh;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 0 2%;
  margin-top: 4vh;
  .menu-header {
    display: flex;
    justify-content: flex-end;
    padding: 1vh;
    .fold-btn {
      width: 2vw;
      height: 2vh;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
}
.animation1 {
  animation: myfirst 1s;
  -webkit-animation: myfirst 1s;
}
.hide-menu {
  display: none;
}
@keyframes myfirst {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.75;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.25;
  }
  100% {
    opacity: 0;
    width: 0;
    height: 0;
    margin: 4vh 0;
    padding: 0;
  }
}

@-webkit-keyframes myfirst {
  0% {
    width: 100%;
    height: 100%;
  }
  25% {
    width: 75%;
    height: 75%;
  }
  50% {
    width: 50%;
    height: 50%;
  }
  75% {
    width: 25%;
    height: 25%;
  }
  100% {
    opacity: 0;
    width: 0;
    height: 0;
  }
}
</style>