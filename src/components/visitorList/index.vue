<template>
  <div class="list-container">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">昵称</th>
            <th class="text-left">访问时间</th>
            <th class="text-left">IP地址</th>
            <th class="text-left">邮箱</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.visit_time }}</td>
            <td>{{ item.ip }}</td>
            <td>{{ item.email }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      list: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
      ],
    };
  },
  mounted() {
      this.queryRecentVisitor()
  },
  watch: {},
  props: {},
  methods: {
    async queryRecentVisitor() {
      const res = await this.$http
        .get("/api/queryRecentVisitors")
        .then((res) => {
          this.list = res.data
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>