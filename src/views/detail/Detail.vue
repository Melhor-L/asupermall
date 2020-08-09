<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titlesClick="titlesClick" ref="nva"></detail-nav-bar>
    <scroll class="content" ref="scroll"
            @scroll="contentScroll"
            :probe-type= "3">
<!--      <ul>-->
<!--        <p>在详情页中显示添加购物车的详细信息</p>-->
<!--        <li v-for="(item,index) in $store.state.cartList" :key="index">-->
<!--          {{item}}-->
<!--        </li>-->
<!--      </ul>-->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <good-list ref="recommend" :goods="recommends"></good-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>


  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";//详情页导航栏
  import DetailSwiper from "./childComps/DetailSwiper";//详情页轮播图
  import DetailBaseInfo from "./childComps/DetailBaseInfo";//商品基本信息
  import DetailShopInfo from "./childComps/DetailShopInfo";//商品店铺信息
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";//商品详情
  import DetailParamInfo from "./childComps/DetailParamInfo";//商品参数
  import DetailCommentInfo from "./childComps/DetailCommentInfo";//商品评价
  import BackTop from "../../components/content/backTop/BackTop";//返回首页按钮


  import DetailBottomBar from "./childComps/DetailBottomBar";//底部工具栏

  import Scroll from "../../components/common/scroll/Scroll";//详情页滚动
  import GoodList from "../../components/content/goods/GoodList";

  import { getDetail , Goods , Shop ,GoodsParam , getRecommend } from "../../network/detail";
  import { debounce } from '../../common/utils';//去抖动
  // import { itemListenerMixin } from "../../common/mixin";//混入mixin

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodList,
      BackTop,

    },
    // mixins: [itemListenerMixin],/*混入使用*/
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs: [],
        currentIndex: 0,
        isShowBackTop: false,

      }
    },
    created() {
      // 1.保存请球的数据iid
      this.iid = this.$route.params.iid
      //2.根据数据请求iid详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        //1.获取顶部轮播的数据
        const data = res.result
        this.topImages = data.itemInfo.topImages;
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //3.创建店铺信息
        this.shop = new Shop(data.shopInfo)
        //4.保存商品详情数据
        this.detailInfo = data.detailInfo
        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6.取出商品详细信息
        if (data.rate.cRae !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        //根据最新的数据,对应的DOM是已经被渲染出来
        //但是图片的数据依然没有加载完(目前获取的 offsetTop 是不好含图片的)
        // this.$nextTick( () => {
        //   this.themeTopYs = []
        //   //监听点击事件实现滚动位置(标题联动效果)
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs);
        // })

      })
      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    mounted() {

      let refresh = debounce(this.$refs.scroll.refresh, 100)
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)

    },
    destroyed() {
      // console.log('destroyed');
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        //监听点击事件实现滚动位置(标题联动效果)
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)//评论
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
      },
      titlesClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },

      contentScroll(position) {
        // console.log(position);
        //1.获取y值
        const positionY = -position.y // eslint-disable-line no-unused-vars

        //2.positionY和主题中的值进行对比
        for (var i =0; i<this.themeTopYs.length; i++){
          // if (positionY > this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[i+1]){
          //   console.log(i);
          // }
          let length = this.themeTopYs.length
          for (let i=0;i < length; i++){
            if (this.currentIndex !== i && ((i <length - 1 && positionY > this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >this.themeTopYs[i]))) {
              // console.log(i);
              this.currentIndex = i
              console.log(this.currentIndex);
              this.$refs.nva.currentIndex = this.currentIndex

            }
          }
          //3.判断滚动的位置来显示backTop按钮
          this.isShowBackTop = -position.y >1000
        }
      },
      //回到顶部按钮的方法
      backTop() {
        this.$refs.scroll.scrollTo(0,0,500)

      },
      //点击购物车拿取数据
      //加入购物车方法
      addCart() {
        // console.log('------');
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.nowprice = this.goods.newPrice
        product.iid = this.iid
        //2.将商品添加到购物车里面
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart', product)

      }
    },

  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  /*.content {*/
  /*  overflow: hidden;*/

  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/
  .content {
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }
</style>