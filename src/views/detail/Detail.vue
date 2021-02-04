<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>

    <scroll class="cont" ref="scroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :param-info="paramInfo"/>
    </scroll>

  </div>
</template>
<script>
import {getDetail,Goods,Shop,GoodsParam} from 'network/detail.js'
import Scroll from 'components/common/scroll/Scroll.vue';

import DetailNavBar from './childComps/DetailNavBar.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';

export default {
  name:"Detail",
  components:{DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, Scroll, DetailGoodsInfo, DetailParamInfo},
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
    }
  },
  created(){
    this.iid=this.$route.params.id;
    getDetail(this.iid).then(res=>{
      console.log(res.result)
      const data=res.result
      //轮播图
      this.topImages=data.itemInfo.topImages
      //商品介绍
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //商家信息
      this.shop=new Shop(data.shopInfo)
      //商品详情
      this.detailInfo=data.detailInfo
      //参数itemParams 
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      console.log(this.paramInfo)
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>
<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;

  height: 100vh;
}
.cont{
  height: calc(100% - 44px);
  /* position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0; */
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>