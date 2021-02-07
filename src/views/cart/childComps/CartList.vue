<template>
  <scroll class="cart-list" ref="scroll">
    <cart-list-item v-for="(item,index) in cartListTotal" :itemInfo="item" :key="index"/>
  </scroll>
</template>
<script>
import { mapGetters } from "vuex";

import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue';
export default {
  name:"CartList",
  components: { 
    Scroll,
  CartListItem ,
  },
  data(){
    return {
    }
  },
  computed:{
    ...mapGetters(['cartListTotal']) 
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
.cart-list{
  height: calc(100vh - 133px);
  overflow: hidden;
}
</style>