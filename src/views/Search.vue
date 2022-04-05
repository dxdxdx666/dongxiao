<template>
  <div class="search">
    <Navi />
    <Bg />
    <div class="search-inp">
      <van-search
        v-model="name"
        @search="searchClick"
        placeholder="请输入商品名称"
        shape="round"
      />
    </div>
    <div class="search-box" v-show="isClick">
      <div
        class="search-item"
        v-for="(item, index) in searchProductData"
        :key="index"
        @click="viewProductDetail(item.pid)"
      >
        <ProductHome :pro="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
import Bg from "../components/Bg.vue";
import ProductHome from "../components/ProductHome.vue";
export default {
  name: "Search",
  data() {
    return {
      name: "",
      isClick:false,
      searchProductData: [],
    };
  },
  components: {
    Bg,
    Navi,
    ProductHome,
  },
  methods: {
    //点击搜索
    searchClick() {
      this.search(this.name);
      this.isClick = true;
    },

    //获取搜索结果
    search(name) {
      this.axios({
        method: "get",
        url: "/search",
        params: {
          name,
        },
      })
        .then((result) => {
          console.log(result);
          this.$toast(result.data.msg);

          if (result.data.code === "Q001") {
            this.searchProductData = result.data.result;
          }

          if (result.data.code === 700) {
            this.$router.push({ name: "Login" });
            return;
          }
        })
        .catch((err) => {});
    },

     //查看商品详情
      viewProductDetail(pid) {
        this.$router.push({name: 'Detail', params: {pid}})
      },
  },
};
</script>

<style lang="less" scoped>
.search {
  position: relative;
  .search-inp {
    position: absolute;
    top: 0;
    right: 0;
    width: 270px;
    z-index: 999;
    /deep/ .van-search {
      padding: 6px 0;
    }
  }
  .search-box {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    background-color: #fff;
    margin: 0 10px;
    position: relative;
    top: -20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .search-item {
      width: calc(100%/2 - 5px);
      margin-bottom: 10px;
      margin-right: 10px;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
}
</style>