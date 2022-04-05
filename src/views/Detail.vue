<template>
  <div class="detail">
    <Navi title="商品详情" :fixed="true" />
    <div>
      <div class="detail-img">
        <img class="auto-img" :src="productDetail.large_img" alt="" />
      </div>

      <div class="detail-info">
        <div class="detail-pro">
          <div>
            <div class="detail-name one-text">{{productDetail.name}}</div>
            <div class="detail-enname one-text">{{productDetail.enname}}</div>
          </div>
          <div class="detail-price">&yen;{{productDetail.price}}</div>
        </div>

        <div class="detail-rules">

          <div class="detail-rules-item" v-for="(v1, i1) in productDetail.rulesData" :key="i1">
            <div class="rules-title">{{v1.title}}</div>
            <div class="rules">
              <div class="rules-item" :class="{active: i2 === v1.activeIndex}" v-for="(v2, i2) in v1.subRule" :key="i2" @click="selectRule(v1, i2)">{{v2.title}}</div>
            </div>
          </div>

        </div>

        <div class="select-count-box">
          <div class="select-text">选择数量</div>
          <div class="select-count">
            <van-stepper v-model="count" theme="round" button-size="22" disable-input />
          </div>
        </div>

        <div class="detail-desc">
          <div class="detail-desc-title">商品描述</div>
          <div class="detail-desc-content">
            <div class="desc-item" v-for="(item, index) in productDetail.desc" :key="index">{{index + 1}}、{{item}}</div>

          </div>
        </div>

      </div>

    </div>

    <van-goods-action>
      <van-goods-action-icon :to="{name: 'Shopbag'}" icon="bag" text="购物袋" color="#646566" :badge="shopbagCount" />
      <van-goods-action-icon icon="like" :text="isLike ? '已收藏' : '收藏'" :color="isLike ? '#e4393c' : '#646566'" @click="likeProduct" />
      <van-goods-action-button
        color="#0C34BA"
        text="加入购物袋"
        @click="addShopbag"
      />
    </van-goods-action>

  </div>
</template>

<script>
  import Navi from '../components/Navi.vue';
  export default {
    name: 'Detail',
    data() {
      return {
        count: 1,
        pid: '',
        productDetail: {},
        //是否收藏
        isLike: false,

        //购物袋数量
        shopbagCount: ''

      };
    },
    components: {
      Navi
    },

    created() {
      this.pid = this.$route.params.pid;
      this.getProductDetailByPid(this.pid);
      this.findCurrentLike();
      this.getShopbagCount();
    },

    methods: {
      //根据商品pid获取商品详情数据
      getProductDetailByPid(pid) {
        this.axios({
          method: 'get',
          url: '/productDetail',
          params: {
            pid
          }
        }).then(result => {
          
          if (result.data.code === 600) {

            let data = result.data.result[0];

            data.desc = data.desc.split(/\n/);

            


            //处理商品规格数据
            /**
             * [
             *  {
             *    title: '温度',
             *    activeIndex: 0,
             *    subRule: [
             *      {
             *        title: '热'
             *      }
             *    ]
             *  }
             * ]
             */

            let rulesData = [];

            //构造规格数组
            let rules = ['tem', 'sugar', 'milk', 'cream'];
            rules.forEach(v1 => {

              if (data[v1] === '') {
                return;
              }

              let rulesItem = {
                title: data[`${v1}_desc`],
                activeIndex: 0,
                subRule: []
              };
              let rule = data[v1].split(/\//);
              rule.forEach(v2 => {
                rulesItem.subRule.push({title: v2});
              })

              rulesData.push(rulesItem);
            })

            

            data.rulesData = rulesData;

            //先处理数据, 再赋值给data数据, 否则如果为对象添加新的属性时， vue无法监听新的属性变化
            this.productDetail = data;
          }
        }).catch(err => {
         
          
        })
      },

      //选择规格
      selectRule(item, index) {

        if (item.activeIndex === index) {
          
          return;
        }
        item.activeIndex = index;
      },

      //收藏或取消收藏商品
      likeProduct() {

        let url = this.isLike ? '/notlike' : '/like';

        this.axios({
          method: 'post',
          url,
          data: {
            pid: this.pid
          }
        }).then(result => {
          

          this.$toast(result.data.msg);

          if (result.data.code === 700) {
            
            //token无效, 没有登录
            return this.$router.push({name: 'Login'});
          }


          if (result.data.code === 800) {
            this.isLike = true;
          } else if (result.data.code === 900 && result.data.result === 1) {
            this.isLike = false;
          }
          
        }).catch(err => {
         
          
        })
      },

      //查询当前是否被收藏
      findCurrentLike() {
        // let tokenString = localStorage.getItem('token');

        this.axios({
          method: 'get',
          url: '/findlike',
          params: {
            pid: this.pid
          }
        }).then(result => {
          

          if (result.data.code === 1000) {
            if (result.data.result.length > 0) {
              this.isLike = true;
            }
          }
          
        }).catch(err => {
         
          
        })
      },

      //获取购物袋的商品总数量
      getShopbagCount() {
        this.axios({
          method: 'get',
          url: '/shopcartCount'
        }).then(result => {
          
          if (result.data.code === 4000) {
            this.shopbagCount = result.data.result;
            
          }
        }).catch(err => {
         
          
        })
      },

      //加入购物袋
      addShopbag() {
        //获取商品的pid
        //获取商品数量

        //获取商品的规格
        
        let rule = [];
        this.productDetail.rulesData.forEach(item => {
          rule.push(item.subRule[item.activeIndex].title);
        })

        

        this.axios({
          method: 'post',
          url: '/addShopcart',
          data: {
            pid: this.pid,
            count: this.count,
            rule: rule.join('/')
          }
        }).then(result => {
          

          

          if (result.data.code === 700) {
            this.$toast(result.data.msg);
            //token无效, 没有登录
            this.$router.push({name: 'Login'});
            return;
          }



          if (result.data.code === 3000) {
            this.$toast('加入购物袋成功');
            this.shopbagCount = Number(this.shopbagCount) + this.count;
          } else {
            this.$toast('加入购物袋失败');
          }
        }).catch(err => {
          
        })
        
      }

    }
  }
</script>

<style lang="less" scoped>
  .detail{
    padding-bottom: 50px;
    padding-top: 46px;
    .desc-item{
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .detail-desc-content{
      color: #666;
    }
    .detail-desc-title{
      font-size: 14px;
      margin-bottom: 10px;
    }
    .detail-desc{
      margin-top: 20px;
    }
    .select-text{
      font-size: 14px;
      color: #666;
    }
    .select-count{
      margin-left: auto;
    }
    .select-count-box{
      padding: 15px 0;
      margin-top: 20px;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
    }
    .rules-item{
      text-align: center;
      width: 70px;
      line-height: 30px;
      height: 30px;
      background-color: #e8e8e8;
      margin-right: 10px;
      border-radius: 16px;
      &:last-child{
        margin-right: 0;
      }
      &.active{
        background-color: #3762f0;
        color: #fff;
      }
    }
    .rules-title{
      width: 50px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
    .rules{
      display: flex;
      font-size: 14px;
    }
    .detail-rules-item{
      display: flex;
      margin-bottom: 10px;
    }
    .detail-rules{
      margin-top: 20px;
    }
    .detail-price{
      font-size: 16px;
      font-weight: bold;
      color: #e4393c;
    }
    .detail-name{
      font-size: 14px;
    }
    .detail-enname{
      color: #999;
      font-size: 12px;
    }
    .detail-price{
      margin-left: auto;
    }
    .detail-pro{
      display: flex;
      align-items: center;
    }
    .detail-info{
        padding: 10px;
        background-color: #fff;
        margin: 0 10px;
        position: relative;
        top: -20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .detail-img{
      background-color: #ddd;
    }
  }
</style>