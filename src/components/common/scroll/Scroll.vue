<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  name:"Scroll",
  data(){
    return{
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
      this.scroll=new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        click:true
      })

      if(this.probeType===2||this.probeType===3){
        this.scroll.on('scroll',(position)=>{//实时监听位置
          this.$emit('scroll',position)
        })
      }
      
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{//上拉
          this.$emit('pullingUp')
        })
      }
      
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0;
    }
  }
}
</script>
<style scoped>
</style>