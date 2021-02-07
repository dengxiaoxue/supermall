<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import NavBar from '../../components/common/navbar/NavBar.vue'
import CartBottom from './childComps/CartBottom.vue';
import CartList from './childComps/CartList.vue';
export default {
  components: { NavBar, CartList, CartBottom },
  name:"Cart",
  computed:{
    ...mapGetters({
      length:'cartLength'
    })
  },
}
</script>
<style scoped>
.nav-bar{
  background-color: pink;
  color:rgb(85, 95, 128);
}
</style>