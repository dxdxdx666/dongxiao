<template>
  <div class="home">
    <van-nav-bar fixed>
      <template #left>
        <div class="title-box">
          <div class="hello">{{timeText}}</div>
          <div class="username-box">
            <div class="username" v-if="isLogin">{{username}}</div>
            <div class="login-text" v-else @click="goLogin">登录</div>
          </div>
        </div>
      </template>
      <template #right>
        <div class="lan">
          美好的一天从咖啡开始
        </div>
      </template>
    </van-nav-bar>
    <div>
      <van-swipe indicator-color="#0C34BA">
        <van-swipe-item v-for="(item, index) in bannerData" :key="index">
          <div class="banner-box" @click="viewProductDetail(item.pid)">
            <img class="auto-img" :src="item.bannerImg" alt="">
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hot-title">热卖推荐</div>
    <div class="hot-product">
      <div class="hot-product-item" v-for="(item, index) in hotProductData" :key="index" @click="viewProductDetail(item.pid)">
        <ProductHome :pro="item" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductHome from '../components/ProductHome.vue';
  export default {
    name: 'Home',

    components:{
      ProductHome
    },

    data() {
      return {
        //轮播图数据
        bannerData: [],

        //热卖商品数据
        hotProductData: [],

        //时间文本
        timeText: '',

        username: '',

        isLogin: false
      };
    },

    created() {
      this.getBannerData();
      this.getHotProduct();
      this.getCurrentTime();
      this.getUserInfo();
    },

    methods: {
      //获取轮播图数据
      getBannerData() {
         this.axios({
          method: 'get',
          url: '/banner'
        }).then(result => {
          

          if (result.data.code === 300) {
            this.bannerData = result.data.result;
          }


          
        }).catch(err => {
         
          
        })
      },

      //查看商品详情
      viewProductDetail(pid) {
        this.$router.push({name: 'Detail', params: {pid}})
      },

      //获取热卖商品
      getHotProduct() {
        this.axios({
          method: 'get',
          url: '/typeProducts',
          params: {
            key: 'isHot',
            value: 1
          }
        }).then(result => {
          

          if (result.data.code === 500) {
            result.data.result.forEach(item => {
              item.small_img = item.smallImg;
            })
            this.hotProductData = result.data.result;
          }
          
        }).catch(err => {
         
          
        })
      },

      //获取当前时间
      getCurrentTime() {
        //定义时间段
        //00-06: 凌晨
        //07-10: 上午
        //11-14: 中午
        //15-18: 下午
        //19-23: 晚上

        let date = new Date();
        //获取小时
        let hours = date.getHours();
        

        if (hours >= 19) {
          //晚上
          this.timeText = '晚上好';
        } else if (hours >= 15) {
          //下午
          this.timeText = '下午好';
        } else if (hours >= 11) {
          //中午
          this.timeText = '中午好';
        } else if (hours >= 7) {
          //上午
          this.timeText = '上午好';
        } else {
          //凌晨
          this.timeText = '凌晨好';
        }
      },

      //获取用户信息
      getUserInfo() {
        this.axios({
          method: 'get',
          url: '/findMy'
        }).then(result => {
          

          if (result.data.code === 'A001') {
            this.username = result.data.result[0].nickName;
            this.isLogin = true;
          }
          
        }).catch(err => {
         
          
        })
      },

      //跳转登录
      goLogin() {
        this.$router.push({name: 'Login'});
      }
    }
  }
</script>

<style lang="less" scoped>
  .home{
    padding: 10px;
    padding-top: 56px;
    padding-bottom: 50px;
    .lan{
      padding-right: 10px;
      font-size: 14px;
      font-weight: bolder;
      font-style: italic;
    }
    .hot-title{
      margin: 10px;
      width: 86px;
      height: 35px;
      background-color: #0C34BA;
      color: #fff;
      font-size: 14px;
      text-align: center;
      line-height: 35px;
      border-radius: 0 20px 0  0;
    }
    

    
    .auto-img{
      border-radius: 10px;
    }
    .hot-product{
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      background-color: #fff;
    }

    .hot-product-item{
      width: calc(50% - 5px);
      margin-bottom: 10px;
      margin-right: 10px;
      &:nth-child(2n){
        margin-right: 0;
      }
    }
    /deep/ .van-search{
      padding: 0 10px;
      width: 100%;
    }

    /deep/ .van-nav-bar__right{
      // width: 100%;
      padding: 0;
    }

    .title-box{
      display: flex;
      font-size: 14px;
      align-items: center;
    }
    .hello{
      margin-right: 10px;
    }
    .username{
      font-weight: bold;
      color: #0C34BA;
    }
    .login-text{
       font-weight: bold;
    }
  }
</style>