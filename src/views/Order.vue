<template>
  <div class="order">
    <Navi title="我的订单" :fixed="true" />
    
    <div>
      <Bg>
        <van-tabs v-model="active" color="#0C34BA" line-height="2" animated swipeable @change="toggleTab">
          <van-tab :title="item.title" v-for="(item, index) in tabsData" :key="index">
            <div class="tab-content">

               <div class="order-product" v-for="(v, i) in orderData" :key="i">
                  <div class="order-info">订单信息</div>
                  <div class="order-no">
                    <div class="no">订单编号：{{v.oid}}</div>
                    <div class="order-op">
                      <div v-if="v.status === 1" @click="confirm(v, i)">确认收货</div>
                      <div class="op" v-else>
                        <div class="finished">已完成</div>
                        <div class="remove" @click="removeOrder(v.oid, i)">
                          <van-icon name="delete-o" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="order-pro">

                    <div class="order-pro-item" v-for="(v1, i1) in v.product" :key="i1">
                      <OrderPro :pro="v1" />
                    </div>
                    
                  </div>
                  <div class="order-total">
                    <div class="order-date">{{v.date | formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
                    <div class="order-count">共计 {{v.count}} 件商品</div>
                    <div class="order-money">订单金额：&yen;{{v.total}}</div>
                    <div class="left-circle circle"></div>
                    <div class="right-circle circle"></div>
                  </div>
                </div>
                <van-empty v-show="orderData.length === 0" description="没有订单数据！" />

            </div>
          </van-tab>

        </van-tabs>
      </Bg>
      
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
import Bg from "../components/Bg.vue";
import OrderPro from "../components/OrderPro.vue";
export default {
  name: "Order",
  components: {
    Navi,
    Bg,
    OrderPro
  },
  data() {
    return {
      //激活tab的下标, 0 ==> 全部(包含进行中 + 已完成), 1 ==> 进行中, 2 ==> 已完成
      active: 0,

      count: 0,
      total: 0,

      //标签页的数据
      tabsData: [
        {
          title: '全部'
        },
        {
          title: '进行中'
        },
        {
          title: '已完成'
        }
      ],

      orderData: []
    };
  },

  created() {
    this.getOrderData();
  },

  methods: {
    //获取我的订单
    getOrderData() {
      this.axios({
          method: 'get',
          url: '/findOrder',
          params: {
            status: this.active
          }
        }).then(result => {
          
          
          if (result.data.code === 700) {
            this.$toast(result.data.msg);
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 70000) {
            //获取订单编号
            let orderNo = [];
            result.data.result.forEach(item => {
              item.small_img = item.smallImg;
              if (orderNo.indexOf(item.oid) === - 1) {
                orderNo.push(item.oid);
              }
            })

            
            /**
             * [
             *   {
             *     oid: '',
             *     status: 0,
             *     product: [
             *       {}
             *     ],
             *     date: '',
             *     count: 0,
             *     total: 0
             *   }
             * ]
             */
            
            let orderData = [];
            //按照订单编号分类
            orderNo.forEach(v => {

              let currentOrder = {
                oid: v,
                product: [],
                count: 0,
                total: 0
              };

              result.data.result.forEach(item => {
                if (v === item.oid) {

                  if (currentOrder.status === undefined) {
                    currentOrder.status = item.status;
                    currentOrder.date = item.createdAt;
                  }

                  currentOrder.product.push(item);
                  currentOrder.count += item.count;
                  currentOrder.total += item.count * item.price;
                }
              })

              orderData.push(currentOrder);

            })

            

            this.orderData = orderData;


          }


        }).catch(err => {
         
          
        })
    },

    //切换订单状态
    toggleTab() {
      
      this.getOrderData();
    },

    //确认收货
    confirm(item, index) {
      this.$dialog.confirm({
        message: '是否确定收货？'
      }).then(() => {
        
        this.axios({
          method: 'post',
          url: '/receive',
          data: {
            oid: item.oid
          }
        }).then(result => {
          

          this.$toast(result.data.msg);

          if (result.data.code === 700) {
            
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 80000) {
            if (this.active === 0) {
              item.status = 2;
              
            } else if (item.status === 1) {
              //删除页面的订单数据
              this.orderData.splice(index, 1);
            }
          }


        }).catch(err => {
         
          
        })
      }).catch(err => {
        
        
      })
    },

    //删除订单
    removeOrder(oid, index) {
      this.$dialog.confirm({
        message: '是否确定删除该订单？'
      }).then(() => {
        
        this.axios({
          method: 'post',
          url: '/removeOrder',
          data: {
            oid
          }
        }).then(result => {
          

           this.$toast(result.data.msg);

          if (result.data.code === 700) {
           
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 90000) {
            this.orderData.splice(index, 1);
          }

        }).catch(err => {
         
          
        })
      }).catch(err => {
        
      })
    }
  }
};
</script>

<style lang="less" scoped>
.order {
  padding-top: 46px;
  .order-product{
    margin-bottom: 10px;
    background-color: #fff;
    padding: 10px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .remove{
    width: 16px;
    height: 16px;
    font-size: 16px;
  }
  .finished{
    margin-right: 10px;
  }
  .op{
    display: flex;
    align-items: center;
  }
  .order-no{
    display: flex;
    font-size: 14px;
  }
  .no{
    color: #666;
    margin-right: auto;
  }
  .order-op{
    display: flex;
    margin-bottom: 10px;
  }
   /deep/ .van-tabs__content{
      margin-top: 10px;
    }


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
    flex-wrap: wrap;
  }
  .order-date{
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>