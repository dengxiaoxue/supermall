<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                   @tabClick="tabClick" 
                   ref="tabControl1"
                   class="tab-control" v-show="isTabFixed"/>

    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" 
                   @tabClick="tabClick" 
                   ref="tabControl2"/>
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>
<script>
import {getHomeMultidata,getHomeGoods} from 'network/home'

import {debounce} from 'common/utils.js'

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'



export default {
  name:"Home",
  components: { 
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    this.getHomeMultidata();

    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted(){
    // 图片
    const refresh=debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('itemImageLoad',()=>{
      refresh() 
    })
  },
  deactivated(){
    this.saveY=this.$refs.scroll.getScrollY()
    // console.log(this.saveY)
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  methods:{
    /**网络请求 */
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners=res.data.banner.list,
        this.recommends=res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        // console.log(res.data)
       this.goods[type].list.push(...res.data.list);
       this.goods[type].page+=1;

       //数据加载完之后再做下一次下拉加载
       this.$refs.scroll.finishPullUp()
    })
    },
    /**事件监听 */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      // 1.判断是否显示
      this.isShowBackTop = -position.y > 1000 ? true : false ;
       //2.判断是否吸顶（position:fixed）
       this.isTabFixed= -position.y >546 ? true : false
    },
    loadMore(){
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    }
  }
  
}
</script>
<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:rgb(85, 95, 128);

  /* position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9; */
}

.content{
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
} */
.tab-control{
  position: relative;/*占据原来的位置*/
  z-index: 9; /*只对定位的元素起效果*/
}
</style>