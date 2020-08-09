<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"></tab-control>

    <!-- :proba-type="3" 判断该滚动区域是否需要实时监听滚动的位置
          ref="scroll"  监听下拉加载更多
          :pull-up-load="true" scroll的一个方法,值为true时才出发监听
           @scroll="contentScroll" 封装的scroll 内部发出来的方法-->
    <scroll class="content"
            ref="scroll"
            :proba-type="3"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :pull-up-load="true">
      <home-swiper :banners="banners" @swipperImageLoad="swipperImageLoad"></home-swiper>
      <recommend-vies :recommends="recommends"></recommend-vies>
      <feature-view></feature-view>
      <!--动态绑定:class="{ fixed: isTabFixed }" 这里用的时对象语法-->
      <tab-control
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl"></tab-control>
      <GoodList :goods="goods[currentType].list"></GoodList>
    </scroll>
    <!--返回顶部组件  组件不可以直接监听点击事件,必须要加上.native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>

  import NavBar from "../../components/common/navbar/NavBar"
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendVies from "./childComps/RecommendVies";
  import FeatureView from "./childComps/FeatureView";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodList from "../../components/content/goods/GoodList";
  import Scroll from "../../components/common/scroll/Scroll";/*滚动*/

  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";



  export default {
    name: "Home",
    components: {
      Scroll,
      NavBar,
      HomeSwiper,
      RecommendVies,
      FeatureView,
      TabControl,
      GoodList,
      BackTop
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabofsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },
    //判断离开该页面是否被销毁
    destroyed() {
      console.log('销毁');
    },
    //判断是否离开该页面,并保存一个当前页面的值
    deactivated() {
      //1.保存y值
      this.saveY = this.$refs.scroll.scroll.y
      //2.取消全局事件监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    //回来该页面时候,跳转到该页面指定位置saveY
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    created() {/*一般情况下,created只写主要逻辑,只要知道调用哪个方法就行*/
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      /*防抖  图片加载完成的事件监听 */
      const refresh = this.debounce(this.$refs.scroll.refresh,200)

      //3.监听item中图片加载完成,刷新refresh()
      //对监听的事件进行保存
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImgListener)
    },
    methods: {
      /*获取tabControl的offsetTop(就是获取tabControl组件距离顶部的位置,做一个吸顶效果)
      *    所有组件都有一个属性$el: 用于获取组件中的元素*/
      swipperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabofsetTop = this.$refs.tabControl.$el.offsetTop
      },
      // 事件监听
      /* 防抖*/
      debounce(func,delay){
        let timer = null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this , args)
          }, delay)
        }
      },

      /*监听点击事件 流行 新款 热卖 点击方法*/
      tabClick(index){
        // console.log(index);/*打印监听事件*/
        /*用switch方法来判断给currenType传入值,再直接使用currentType*/
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        /*监听点击事件,让两个tabControl处于当前点击的事件一致*/
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },
      /*返回顶部方法*/
      backClick(){
      this.$refs.scroll.scrollTo(0,0)
      // console.log('backClick');
    },
      /*判断BackTop按钮是否需要隐藏*/
      contentScroll(position){
        // console.log(position);
        /*1.判断BackTop按钮是否需要隐藏*/
        this.isShowBackTop = -position.y >1000
        /*2.决定tabControl是否吸顶 (position: fixed;)*/
        this.isTabFixed = -position.y > this.tabofsetTop
      },
      /*下拉加载更多*/
      loadMore(){
        this.getHomeGoods(this.currentType)
        // console.log('上拉加载更多');
      },
      /*网络请求
      * */

      /*封装了一个getHomeGoods()方法*/
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          /*把一个数组放入另一个数组里面 需要用push方法*/
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
          // console.log(res);
        })
      },
      getHomeMultidata() {
        //1.请求多个数据
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
          // console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;/*视口*/
  }

  .home-nav {
    background: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .tab-control{
    /*是粘性定位，新的定位方式，专门用于页面滚动的时候的定位，可以方便实现吸顶条的效果
      需要设置一个top属性 来控制他距离top位置*/
    /*position: sticky;*/
    position: relative;
    /*top: 44px;*/
    background: #fff;
    /*z-index 属性指定一个元素的堆叠顺序。
              拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面*/
    z-index: 9;
  }
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
  }

</style>
