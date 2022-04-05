<template>
  <div class="main">
    
    <div>
      <router-view></router-view>
    </div>

    <van-tabbar v-model="activeIndex" inactive-color="#646566" active-color="#0C34BA" route>

      <van-tabbar-item v-for="(item, index) in tabbarData" :key="index" :to="{name: item.routeName}">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
        </template>
      </van-tabbar-item>

    </van-tabbar>

  </div>
</template>

<script>

export default {
  name: 'Main',
  data() {
    return {
      activeIndex: 0,
      tabbarData: [
        {
          title: '首页',
          routeName: 'Home',
          activeIcon: require('../assets/home_active.png'),
          inactiveIcon: require('../assets/home.png')
        },
        {
          title: '菜单',
          routeName: 'Menu',
          activeIcon: require('../assets/menu_active.png'),
          inactiveIcon: require('../assets/menu.png')
        },
        {
          title: '购物袋',
          routeName: 'Shopbag',
          activeIcon: require('../assets/shopbag_active.png'),
          inactiveIcon: require('../assets/shopbag.png')
        },
        {
          title: '我的',
          routeName: 'My',
          activeIcon: require('../assets/my_active.png'),
          inactiveIcon: require('../assets/my.png')
        }
      ]
    };
  }
}
</script>

<style lang="less" scoped>
  .box{
    width: 200px;
    height: 200px;
    background-color: #e4383c;
  }
</style>
