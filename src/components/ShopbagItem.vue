<template>
  <div class="shopbag-item">
    <div>
      <van-checkbox v-model="shopbagItemData.isCheck" checked-color="#0C34BA" @change="selectOne"></van-checkbox>
    </div>
    <div class="shopbag-item-img">
      <img class="auto-img" :src="shopbagItemData.small_img" alt="">
    </div>
    <div class="shopbag-item-content">
      <div class="shopbag-name">
        <div class="zhname-box">
          <div class="zhname one-text">{{shopbagItemData.name}}</div>
          <div class="rule one-text">{{shopbagItemData.rule}}</div>
        </div>
        <div class="enname one-text">{{shopbagItemData.enname}}</div>
      </div>

      <div class="price-count">
        <div class="price">&yen;{{shopbagItemData.price}}</div>
        <div class="count">
          <van-stepper v-model="shopbagItemData.count" theme="round" button-size="22" disable-input @change="updateCount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShopbagItem',
    props: {
      shopbagItemData: {
        type: Object,
        default() {
          return {};
        }
      }
    },

    methods: {
      selectOne() {
        this.$emit('select-one');
      },
      updateCount() {
        this.$emit('update-count');
      }
    }
  }
</script>

<style lang="less" scoped>
  .shopbag-item{
    display: flex;
    padding: 10px;
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
      margin: 0 10px;
    }
    .shopbag-item-content{
      width: calc(100% - 110px);
      height: 80px;
    }
  }
</style>