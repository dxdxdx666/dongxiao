<template>
  <div class="shopbag-item">
    <div class="shopbag-item-img">
      <img class="auto-img" :src="pro.small_img" alt="">
    </div>
    <div class="shopbag-item-content">
      <div class="shopbag-name">
        <div class="zhname-box">
          <div class="zhname one-text">{{pro.name}}</div>
          <div class="rule one-text">{{pro.rule}}</div>
        </div>
        <div class="enname one-text">{{pro.enname}}</div>
      </div>

      <div class="price-count">
        <div class="price">&yen;{{pro.price}}</div>
        <div class="count">x{{pro.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderPro',
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
  .shopbag-item{
    display: flex;
    align-items: center;
    .price{
      font-size: 14px;
      font-weight: bold;
      color: #e4393c;
      margin-right: auto;
    }
    .enname{
      font-size: 12px;
      color: #999;
      margin-top: 3px;
    }
    .zhname{
      font-size: 14px;
      max-width: 100px;
    }
    .rule{
      margin-left: 20px;
      color: #666;
      font-size: 14px;
      max-width: 100px;
    }
    .shopbag-name{
      height: 40px;
    }

    .price-count{
      height: 40px;
      display: flex;
      align-items: center;
    }
    .zhname-box{
      display: flex;
    }
    .shopbag-item-img{
      width: 80px;
      height: 80px;
      background-color: #ddd;
      margin-right: 10px;
    }
    .shopbag-item-content{
      width: calc(100% - 110px);
      height: 80px;
    }
  }
</style>