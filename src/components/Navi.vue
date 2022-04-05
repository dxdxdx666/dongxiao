<template>
  <div class="navi">
    <van-nav-bar
      :title="title"
      left-text="返回"
      :right-text="rightText"
      :fixed="fixed"
      left-arrow
      @click-left="back"
      @click-right="clickRight"
    />
  </div>
</template>

<script>
  export default {
    name: 'Navi',
    props: {
      title: {
        type: String,
        default: ''
      },
      rightText: {
        type: String,
        default: ''
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      back() {
        this.$router.go(-1);
      },
      clickRight() {
        this.$emit('click-right');
      }
    }
  }
</script>

<style lang="less" scoped>
  .navi{
    /deep/ .van-nav-bar .van-icon{
      color: #0C34BA;
    }

    /deep/ .van-nav-bar__text{
      color: #0C34BA;
    }
  }
</style>