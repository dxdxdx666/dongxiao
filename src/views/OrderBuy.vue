<template>
  <div class="order-buy">
    <Navi :fixed="true" title="订单结算" />
    <div class="order-buy-box">
      <div class="order-address">
        <div class="select-address">
          <div class="select-address-title" @click="selectAddress">选择地址</div>
          <div class="arrow">
            <van-icon name="arrow" />
          </div>
        </div>

        <div class="userinfo-box">
          <div class="userinfo">
            <div class="username">{{userSelectAddress.name}}</div>
            <div class="phone">{{userSelectAddress.tel}}</div>
            <div v-show="userSelectAddress.isDefault">
              <van-tag round color="#0C34BA">默认</van-tag>
            </div>
          </div>
          <div class="detail-address">{{userSelectAddress.address}}</div>
        </div>
      </div>

      <div class="order-product">
        <div class="order-info">订单信息</div>
        <div class="order-pro">

          <div class="order-pro-item" v-for="(item, index) in buyShopbagProduct" :key="index">
            <OrderPro :pro="item" />
          </div>
          
        </div>
        <div class="order-total">
          <div class="order-count">共计 {{count}} 件商品</div>
          <div class="order-money">订单金额：&yen;{{total}}</div>
          <div class="left-circle circle"></div>
          <div class="right-circle circle"></div>
        </div>
      </div>
    </div>

    <van-popup v-model="show" position="bottom" closeable>
      <div class="sel-address">
        <div class="sel-address-title">选择地址</div>
        <div>
          <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="addAddress"
            @select="select"
          />
        </div>
      </div>
    </van-popup>

    <div class="buy-now">
      <van-button round block color="#0C34BA" @click="pay">立即结算</van-button>
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
import OrderPro from "../components/OrderPro.vue";
export default {
  name: "OrderBuy",
  components: {
    Navi,
    OrderPro,
  },
  data() {
    return {
      show: false,
      chosenAddressId: '',
      list: [],
      userSelectAddress: {
        tel: '',
        name: '',
        isDefault: false,
        address: ''
      },
      //购物袋的sid
      sids: [],

      //结算的购物袋商品数据
      buyShopbagProduct: [],

      //商品总数量
      count: 0,

      //订单总价
      total: 0
    };
  },

  created() {
    this.sids = this.$route.query.sids.split(/-/);
    this.getAddressData();
    this.getBuyShopbagProduct();
  },

  methods: {
    addAddress() {
      this.$router.push({name: 'Address'});
    },

    selectAddress() {
      this.show = true;
    },

    //选择地址
    select(item) {
      
      for (let key in this.userSelectAddress) {
        this.userSelectAddress[key] = item[key];
      }

      this.show = false;
    },

    //获取用户的地址
    getAddressData() {
       this.axios({
          method: 'get',
          url: '/findAddress'
        }).then(result => {
          

          if (result.data.code === 700) {
            this.$toast(result.data.msg);
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 20000) {
            result.data.result.forEach(item => {
              item.isDefault = Boolean(item.isDefault);
              item.address = `${item.province}${item.city}${item.county}${item.addressDetail}`;
              if (item.isDefault) {
                this.chosenAddressId = item.id;
                for (let key in this.userSelectAddress) {
                  this.userSelectAddress[key] = item[key];
                }
              }
            })

            this.list = result.data.result;
          }

        }).catch(err => {
         
          
        })
    },

    //获取结算的购物袋商品
    getBuyShopbagProduct() {
     
       this.axios({
          method: 'get',
          url: '/commitShopcart',
          params: {
            sids: JSON.stringify(this.sids)
          }
        }).then(result => {
          

          if (result.data.code === 700) {
            this.$toast(result.data.msg);
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 50000) {

            if (result.data.result.length === 0) {
              this.$router.push({name: 'Shopbag'});
              return;
            }

            let count = 0
            let total = 0;
            result.data.result.forEach(item => {
              count += item.count;
              total += item.count * item.price;
            })
            this.buyShopbagProduct = result.data.result;
            this.count = count;
            this.total = total;
          }

        }).catch(err => {
         
          
        })
    },

    //结算
    pay() {
      if (!this.chosenAddressId) {
        this.$toast('请选择地址');
        return;
      }

       this.axios({
          method: 'post',
          url: '/pay',
          data: {
            sids: JSON.stringify(this.sids),
            phone: this.userSelectAddress.tel,
            address: this.userSelectAddress.address,
            receiver: this.userSelectAddress.name
          }
        }).then(result => {
          
          
          this.$toast(result.data.msg);

           if (result.data.code === 700) {
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 60000) {
            //跳转到订单页面
            setTimeout(() => {
              this.$router.push({name: 'Order'});
            }, 1000)
            
          }

        }).catch(err => {
         
          
        })
    }

  }
};
</script>

<style lang="less" scoped>
.order-buy {
  padding-top: 46px;
  padding-bottom: 64px;
.buy-now{
    position: fixed;
    left: 0;
    bottom: 0;
    width: calc(100% - 20px);
    padding: 10px;
  }
  /deep/ .van-address-item .van-radio__icon--checked .van-icon{
    background-color: #0C34BA;
    border-color: #0C34BA;
  }

  /deep/ .van-tag--danger{
    background-color: #0C34BA;
  }

  /deep/ .van-button--danger{
    background-color: #0C34BA;
    border-color: #0C34BA;
  }

  /deep/ .van-address-item__edit{
    display: none;
  }

  /deep/ .van-address-item{
    padding: 10px 0;

  }

  /deep/ .van-address-item__value{
    padding-right: 0;
  }
}

.sel-address-title {
  font-size: 16px;
  font-weight: bold;
  padding: 5px 0 10px;
}

.sel-address {
  padding: 10px;
  max-height: 500px;
  overflow-y: auto;
}

.order-buy-box {
  padding: 10px;
  .order-pro-item {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .circle {
    position: absolute;
    top: -10px;
    width: 20px;
    height: 20px;
    background-color: #f5f5f5;
    border-radius: 50%;
  }

  .left-circle {
    left: -20px;
  }
  .right-circle {
    right: -20px;
  }
  .order-pro {
    margin-bottom: 10px;
    padding: 10px 0;
  }
  .order-info {
    padding: 10px 0;
    font-size: 14px;
    font-weight: bold;
  }
  .order-product {
    padding: 10px;
    margin-top: 30px;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .order-money {
    color: #e4393c;
    font-weight: bold;
    margin-left: auto;
  }
  .order-count {
    color: #666;
  }
  .order-total {
    display: flex;
    font-size: 14px;
    align-items: center;
    padding: 20px 0 10px;
    border-top: 1px dashed #e8e8e8;
    position: relative;
  }
  .detail-address {
    margin-top: 10px;
    font-size: 14px;
    color: #999;
  }
  .username {
    font-size: 14px;
    font-weight: bold;
  }
  .phone {
    font-size: 14px;
    color: #666;
    margin: 0 10px;
  }
  .userinfo {
    display: flex;
    align-items: center;
  }
  .userinfo-box {
    margin-top: 10px;
  }
  .order-address {
    background-color: #fff;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .select-address {
    display: flex;
    align-items: center;
    padding: 5px 0;
  }
  .select-address-title {
    font-size: 14px;
    font-weight: bold;
  }

  .arrow {
    width: 14px;
    height: 14px;
    margin-left: 5px;
    font-size: 14px;
  }
}
</style>