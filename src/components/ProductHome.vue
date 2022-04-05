<template>
  <div class="product-home">
    <div class="img-box">
      <img class="auto-img" :src="pro.smallImg" alt="">
    </div>
    <div class="product-name one-text">{{pro.name}}</div>
    <div class="product-enname one-text">{{pro.enname}}</div>
    <div class="product-price">&yen;{{pro.price}}</div>

    <div class="badge-box" v-if="pro.isHot === 1">
      <van-tag mark color="#0C34BA" >热卖</van-tag>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductHome',
    props: {
      pro: {
        type: Object,
        default() {
          return {};
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-home{
    position: relative;
    .img-box{
        border-radius: 15px;
        overflow: hidden;
    }
    .badge-box{
      position: absolute;
      left: 10px;
      top: 5px;
    }
    .product-name{
      margin-top: 10px;
      font-size: 14px;
    }

    .product-enname{
      color: #999;
      font-size: 12px;
    }

    .product-price{
      color: #e4393c;
      font-weight: bold;
      font-size: 14px;
      margin-top: 5px;
    }
  }
</style>