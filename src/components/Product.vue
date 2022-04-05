<template>
  <div class="product">
    <div class="img-box">
      <img class="auto-img" :src="pro.smallImg" alt="">
    </div>
    <div class="product-right">
      <div class="product-name one-text">{{pro.name}}</div>
      <div class="product-enname one-text">{{pro.enname}}</div>
      <div class="pro-info">
        <div class="product-price">&yen;{{pro.price}}</div>
        <div class="pro-remove" v-if="isRemove" @click.stop="remove">
          <van-icon name="delete-o" />
        </div>
      </div>
      
    </div>
    <div class="add">
         <van-stepper 
         theme="round" 
         button-size="22"
         :show-minus= false
         :show-input= false
         disable-input />
    </div>

    <div class="badge-box" v-if="pro.isHot === 1">
      <van-tag mark color="#0C34BA" >热卖</van-tag>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Product',
    props: {
      pro: {
        type: Object,
        default() {
          return {};
        }
      },

      isRemove: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      //删除
      remove() {
        this.$emit('remove');
      },

      
    }
  }
</script>

<style lang="less" scoped>
  .product{
    position: relative;
    width: 100%;
    display: flex;
    .add{
      position: absolute;
      right: 6px;
      bottom: 2px;
    }
    .img-box{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
    }
    .badge-box{
      position: absolute;
      left: 75px;
      top: 0;
      color: #fff;
    }
    .product-name{
      margin-top: 10px;
      margin-bottom: 5px;
      font-size: 16px;
    }

    .product-enname{
      color: #999;
      font-size: 12px;
      width: 100px;
      margin-bottom: 30px;
    }

    .pro-info{
       margin-top: 5px;
       display: flex;
       align-items: center;
    }

    .product-price{
      color: #e4393c;
      font-weight: bold;
      font-size: 16px;
      margin-right: auto;
    }
    .pro-remove{
      width: 20px;
      height: 20px;
      font-size: 20px;
      color: #999;
    }
  }
</style>