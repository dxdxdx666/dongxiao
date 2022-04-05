<template>
  <div class="menu">
    <van-search @focus="goSearch"  placeholder="请输入商品名称" shape="round" />
    <div class="menu-box">
      <div class="menu-left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item :title="item.typeDesc" v-for="(item, index) in menuType" :key="index" @click="getProductByType(item.type)" />
        </van-sidebar>
      </div>
      <div class="menu-right">
        <!-- 商品 -->
        <div class="product-box">
          <div class="product-item" v-for="(item, index) in productData" :key="index" @click="viewDetail(item.pid)">
            <Product :pro="item" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Product from '../components/Product.vue'
  export default {
    name: 'Menu',
    data() {
      return {
        //激活的菜单类型下标
        activeKey: 0,

        //菜单类型数据
        menuType: [],

        //商品数据
        productData: []
      };
    },
    components:{
      Product
    },

    created() {
      this.getProductType();
    },

    methods: {
      //获取商品类型
      getProductType() {

        this.axios({
          method: 'get',
          url: '/type'
        }).then(result => {
          
          if (result.data.code === 400) {
            result.data.result.unshift({type: 'isHot', typeDesc: '热卖推荐'});
            this.menuType = result.data.result;

            let type = result.data.result[this.activeKey].type;
            this.getProductByType(type);
          }
        }).catch(err => {
         
          
        })

      },

      //根据商品类型获取商品数据
      getProductByType(type) {
        
        let key = '';
        let value = '';
        if (type === 'isHot') {
          key = 'isHot';
          value = 1;
        } else {
          key = 'type';
          value = type;
        }

        
        

        this.axios({
          method: 'get',
          url: '/typeProducts',
          params: {
            key,
            value
          }
        }).then(result => {
          

          if (result.data.code === 500) {
            this.productData = result.data.result;
          }
          
        }).catch(err => {
         
          
        })

      },

      //查看商品详情
      viewDetail(pid) {
        
        this.$router.push({name: 'Detail', params: {pid}});
      },

      //进入搜索页面
      goSearch(){
        
          this.$router.push({name:'Search'})
       
      }
    }
  }
</script>

<style lang="less" scoped>
  .menu{
    position: fixed;
    top: 0;
    bottom: 50px;
    right: 0;
    left: 0;
    .product-box{
      
      .product-item{
        width: 100%;
        
        margin-bottom: 10px;
        
      }
    }
    .menu-box{
      display: flex;
      height: calc(100% - 50px);
      .menu-left{
        width: 100px;
        height: 100%;
        background-color: #F7F8FA;
        overflow-y: auto;
        /deep/ .van-sidebar{
          width: 100%;
        }
        /deep/ .van-sidebar-item--select::before{
          width: 2px;
          height: 60%;
          background-color: #0C34BA;
        }
      }
      .menu-right{
        width: calc(100% - 110px);
        height: 100%;
        overflow-y: auto;
        padding-left: 10px;
        padding-right: 10px;
        background-color: #fff;
      }
    }
  }
  
</style>