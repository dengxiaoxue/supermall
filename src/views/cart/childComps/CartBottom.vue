<template>
  <div class="cart-buttom">
    <div class="all-selector">
      <check-button class="bottom-check" :is-checked="isAllChecked" @click.native="allChecked"/>
      <span class="bottom-check-text">全选</span>
    </div>
    <div class="total-price">
      合计: {{totalPrice}}
    </div>
    <div class="computer">去计算({{checkLength}})</div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
  name:"CartBottom",
  data(){
    return{
    }
  },
  components:{
    CheckButton
  },
  computed:{ 
    totalPrice(){
      return '￥'+this.$store.state.cartList.
             filter(item=>item.checked).
             reduce((pre,item)=>pre + item.price*item.count,0).
             toFixed(2)            
    },
    checkLength(){
      return this.$store.state.cartList.filter(x=>x.checked).length
    },
    isAllChecked(){
      if(this.$store.state.cartList.length===0) return false
      return !this.$store.state.cartList.find(x=>!x.checked)
    }
  },
  methods:{
    allChecked(){
      if(this.isAllChecked){
        this.$store.dispatch('allNotCheck')
      }else{
        this.$store.dispatch('allCheck')
      }
    }
  }
}
</script>
<style scoped>
.cart-buttom{
  width: 100%;
  height: 40px;
  background-color:#eee;
  display: flex;
}
.all-selector{
  display: flex;
  align-items: center;
  padding: 0 10px;
  /* background-color: plum; */
}
.bottom-check{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.bottom-check-text{
  font-size: 14px;
}
.total-price{
  flex: 1;
  padding: 10px 0;
  font-size: 16px;
  /* background-color: peachpuff; */
}
.computer{
  padding: 10px;
  font-size: 18px;
  background-color: pink;
}
</style>