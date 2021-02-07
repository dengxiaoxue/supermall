<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>

    <!-- <div v-for="item in $store.state.cartList">{{item}}</div> -->
    <scroll class="cont" ref="scroll" :probeType="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :param-info="paramInfo" ref="param"/>
    <detail-comment-info :comment-info="commentInfo" ref="comment"/>
    <goods-list :goods="recommends" ref="recommend"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
    <!-- <toast></toast> -->
  </div>
</template>
<script>
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import Scroll from 'components/common/scroll/Scroll.vue';
import { itemListenerMixin, backTopMixin } from "common/mixin.js";

import DetailNavBar from './childComps/DetailNavBar.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
import DetailBottomBar from './childComps/DetailBottomBar.vue';
import Toast from '../../components/common/toast/Toast.vue';


export default {
  name:"Detail",
  components:{
    DetailNavBar, 
    DetailSwiper,
    DetailBaseInfo, 
    DetailShopInfo, 
    Scroll, 
    DetailGoodsInfo, 
    DetailParamInfo, 
    DetailCommentInfo, 
    GoodsList,
    DetailBottomBar,
    Toast
    },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTops:[],
      currentIndex:0
    }
  },
  created(){
    this.iid=this.$route.params.id;
    getDetail(this.iid).then(res=>{
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
      //评论信息
      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }
    })
    getRecommend().then(res=>{
      this.recommends=res.data.list
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTops[index],500)
    },
    contentScroll(position){
      let len=this.themeTops.length;  
      for(let i=0;i<len;i++){
        if(this.currentIndex !==i && (i<len-1 && -position.y>=this.themeTops[i]&&-position.y<this.themeTops[i+1])){
          this.currentIndex=i
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }
      this.isShowBackTop = -position.y > 1000 ? true : false ;
    },
    addToCart(){
      const product={}
      product.image=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;
      product.iid=this.iid;

      // this.$store.commit('addCart',product) //到mutations
      this.$store.dispatch('addCart',product).then(res=>{
        this.$toast.show(res,2000)
      })
      // console.log(this.$store.state.cartList)
    }
  },
  mounted(){
  },
  destroyed(){
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  }
}
</script>
<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;

  height: 100vh;
  width: 100%;
}
.cont{
  height: calc(100% - 93px);
  overflow: hidden;
  width: 100%;
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