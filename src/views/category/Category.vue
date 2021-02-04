<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <ul>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
      <li>100</li>
    </ul>
  </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  name:"Category",
  data(){
    return {
      bs:null
    }
  },
  methods:{
    
  },
  mounted(){
    this.bs=new BScroll(this.$refs.wrapper,{
      // probeType:3, 
      // pullUpLoad:true
    });
    // this.bs.on('scroll',(position)=>{
    //   // console.log(position)
    // })
    // this.bs.on('pullingUp',()=>{
    //   console.log(123)
    //   //发起请求

    //   //请求完成并展示出来后
    //   this.bs.finishPullUp() //做下一次上拉加载
    // })
  }
}
</script>
<style scoped>
.wrapper{
  height: 200px;
  background-color: aqua;
}
</style>