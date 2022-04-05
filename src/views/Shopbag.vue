<template>
  <div class="shopbag">
      <Navi title="购物袋" :right-text="text" @click-right="edit" :fixed="true" />
      <div class="shopbag-bg"></div>

      <div v-if="isLogin">
        <div class="shopbag-list">

          <div class="shopbag-list-item" v-for="(item, index) in shopbagData" :key="item.sid">
            <van-swipe-cell>
              <div>
                <ShopbagItem :shopbag-item-data="item" @select-one="selectOne" @update-count="updateCount(item.sid, item.count)" />
              </div>
              <template #right>
                <van-button square color="#e4393c" text="删除" @click="removeShopbag([item.sid])" />
              </template>
            </van-swipe-cell>
            
          </div>

        </div>

        <div v-if="shopbagData.length > 0">
          <van-submit-bar :price="total" button-text="提交订单" v-show="!isEdit" @submit="commitOrder">
            <van-checkbox v-model="isAllSelect" checked-color="#0C34BA" @click="allSelect">全选</van-checkbox>
          </van-submit-bar>

          <van-submit-bar button-text="删除选择" v-show="isEdit" @submit="removeSelectShopbag">
            <van-checkbox v-model="isAllSelect" checked-color="#0C34BA">全选</van-checkbox>
          </van-submit-bar>
        </div>
    </div>
    <div v-else>
      <van-empty image="error" description="请先登录">
        <van-button round type="danger" class="bottom-button" color="#0C34BA" @click="goLogin">去登录</van-button>
      </van-empty>
    </div>

    <div v-if="shopbagData.length === 0">
      <van-empty
        description="购物袋没有商品！"
      />
    </div>


  </div>
</template>

<script>
  import Navi from '../components/Navi.vue'
  import ShopbagItem from '../components/ShopbagItem.vue'
  export default {
    name: 'SHopbag',
    data() {
      return {
        //是否处于编辑状态
        isEdit: false,

        text: '编辑',

        isAllSelect: false,

        //购物袋数据
        shopbagData: [],

        isLogin: true
      }
    },
    components: {
      Navi,
      ShopbagItem
    },

    created() {
      this.getShopbagProduct();
    },

    computed: {
      //计算订单总价
      total() {
        let total = 0;
        this.shopbagData.forEach(item => {
          if (item.isCheck) {
            total += item.price * item.count;
          }
        })

        return total * 100;
      }
    },


    methods: {
      //编辑
      edit() {
        
        
        this.isEdit = !this.isEdit;

        this.text = this.isEdit ? '完成' : '编辑';
      },

      //去登录
      goLogin() {
        this.$router.push({name: 'Login'});
      },

      //获取购物袋商品
      getShopbagProduct() {
        this.axios({
          method: 'get',
          url: '/findAllShopcart'
        }).then(result => {

          
          if (result.data.code === 700) {
            this.isLogin = false;
            this.text = '';
            return;
          }

          if (result.data.code === 5000) {
            result.data.result.forEach(item => {
              item.isCheck = false;
            })
            this.shopbagData = result.data.result;

            if (this.shopbagData.length === 0) {
              this.text = '';
            }
          }
          
        }).catch(err => {
         
          
        })
      },

      //全选
      allSelect() {
        
        this.shopbagData.forEach(item => {
          item.isCheck = this.isAllSelect;
        })
      },

      selectOne() {

        for (let i = 0; i < this.shopbagData.length; i++) {
          if (!this.shopbagData[i].isCheck) {
            this.isAllSelect = false;
            return;
          }
        }

        this.isAllSelect = true;
      },

      //修改数量
      updateCount(sid, count) {
  
         this.axios({
          method: 'post',
          url: '/modifyShopcartCount',
          data: {
            sid,
            count
          }
        }).then(result => {
          

          if (result.data.code === 700) {
            this.$toast(result.data.msg);
            this.$router.push({name: 'Login'});
            return;
          }


        }).catch(err => {
         
          
        })
      },

      //删除商品
      removeShopbag(sids) {
        //sids: 购物袋的sid, array
        
        this.axios({
          method: 'post',
          url: '/deleteShopcart',
          data: {
            sids: JSON.stringify(sids)
          }
        }).then(result => {
          

          this.$toast(result.data.msg);

          if (result.data.code === 700) {
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 7000) {
            sids.forEach(sid => {
              for (let i = this.shopbagData.length - 1; i >= 0; i--) {
                if (sid === this.shopbagData[i].sid) {
                  this.shopbagData.splice(i, 1);
                  break;
                }
                
              }
            })

            this.selectOne();

            if (this.shopbagData.length === 0) {
              this.text = '';
            }

          }


        }).catch(err => {
         
          
        })
      },

      //删除选择的商品
      removeSelectShopbag() {
        //获取删除的购物袋数据的sid
        let sids = [];

        this.shopbagData.forEach(item => {
          if (item.isCheck) {
            sids.push(item.sid);
          }
        })

        

        this.removeShopbag(sids);

      },

      //提交订单
      commitOrder() {
        let sids = [];
        this.shopbagData.forEach(item => {
          if (item.isCheck) {
            sids.push(item.sid);
          }
        })
        
        if (sids.length === 0) {
          this.$toast('请选择下单的商品');
          return;
        }
        this.$router.push({name: 'OrderBuy', query: {sids: sids.join('-')}});
      }
    }
  }
</script>

<style lang="less" scoped>
  .shopbag{
    padding-top: 46px;
    padding-bottom: 100px;
    /deep/ .van-submit-bar{
      bottom: 50px;
    }
    /deep/ .van-submit-bar__button--danger{
      margin-left: auto;
    }
    .shopbag-list-item{
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 10px;
      overflow: hidden;
      &:last-child{
        margin-bottom: 0;
      }
      /deep/ .van-button{
        height: 100%;
      }
    }
    .shopbag-list{
      padding: 10px;
    }
    .shopbag-bg{
      height: 60px;
      background: url("../assets/shopbag_bg.png") no-repeat center center;
      background-size: cover;
    }
  }
</style>