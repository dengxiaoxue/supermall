<template>
  <div v-if="Object.keys(detailInfo).length!==0" class="goods-info">
      <div class="info-desc clear-fix">
        <div class="start"></div>
        <div class="desc">{{detailInfo.desc}}</div>
        <div class="end"></div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
        <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index"
        :src="item" @load="imgLoad">
      </div>
  </div>
</template>
<script>
export default {
  name:"DetailGoodsInfo",
  data(){
    return {
      counter:0,
      imagesLength:0
    }
  },
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imgLoad(){
      if(++this.counter===this.imagesLength){
        this.$emit('imageLoad');
      }
    }
  },
  watch:{
    detailInfo(){
      this.imagesLength=this.detailInfo.detailImage[0].list.length;
    }
  }
}
</script>
<style scoped>
.goods-info{
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.desc{
  font-size: 13px;
  padding: 14px;
}
.info-key{
  font-size: 16px;
  font-weight: 700;
  margin-left: 14px;
}
.info-list{
  width: 100%;
}
.info-list img{
  width: 100%;
}
</style>