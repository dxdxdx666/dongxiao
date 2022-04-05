<template>
  <div class="like">
    <Navi title="我的收藏" :fixed="true" />
    <Bg>
      <div class="product-box">
        <div class="pro-item" v-for="(item, index) in productData" :key="index" @click="viewProductDetail(item.pid)">
          <ProductHome :pro="item" :is-remove="true" @remove="removeProduct(item.pid, index)" />
        </div>
      </div>
    </Bg>

  </div>
</template>

<script>
  import Navi from '../components/Navi.vue';
  import Bg from "../components/Bg.vue";
  import ProductHome from "../components/ProductHome.vue";
  export default {
    name: 'Like',
    components: {
      Navi,
      Bg,
      ProductHome
    },

    data() {
      return {
        productData: []
      };
    },

    created() {
      this.getLikeData();
    },

    methods: {
      //获取用户所有收藏商品
      getLikeData() {
         this.axios({
          method: 'get',
          url: '/findAllLike'
        }).then(result => {
          

          if (result.data.code === 700) {
            this.$toast(result.data.msg);
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 2000) {
            this.productData = result.data.result;
          }

         
        }).catch(err => {
         
          
        })
      },

      //查看商品详情
      viewProductDetail(pid) {
        this.$router.push({name: 'Detail', params: {pid}})
      },

      //删除商品
      removeProduct(pid, index) {
        
        this.axios({
          method: 'post',
          url: '/notlike',
          data: {
            pid
          }
        }).then(result => {
          

          if (result.data.code === 700) {
            this.$toast(result.data.msg);
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 900 && result.data.result === 1) {

            this.$toast('删除成功');
            this.productData.splice(index, 1);
          } else {
            this.$toast('删除失败');
          }

         
        }).catch(err => {
         
          
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .like{
    padding-top: 46px;
    .product-box{
      display: flex;
      background-color: #fff;
      padding: 10px;
      flex-wrap: wrap;
    }
    .pro-item{
      width: calc(50% - 5px);
      margin-bottom: 10px;
      margin-right: 10px;
      &:nth-child(2n){
        margin-right: 0;
      }
    }
  }
</style>