<template>
  <div id="app">

    <router-view/>
    
  </div>
</template>

<style lang="less">
  body{
    margin: 0 auto;
    background-color: #f5f5f5;
    color: #444;
  }

  .auto-img{
    width: 100%;
    display: block;
  }

  .one-text{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
