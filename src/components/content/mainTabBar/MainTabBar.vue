<template>
  <div id="app">
  <tab-bar>
    <tab-bar-item path="/home" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/boluo-03.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/qingpingguo-04.svg">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/caomei-02.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/xiangjiao-05.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/huluobu-28.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/xigua-14.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/putao-15.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/yumi-24.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
  <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  name: 'MianTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
</style>