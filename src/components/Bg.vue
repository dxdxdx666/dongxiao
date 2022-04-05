<template>
  <div class="bg-box">
    <div class="bg"></div>
    <div class="bg-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Bg'
  }
</script>

<style lang="less" scoped>
  .bg{
    height: 120px;
    background-color: #0C34BA;
  }
  .bg-content{
    margin: 0 10px;
    position: relative;
    top: -20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
   
  }


</style>