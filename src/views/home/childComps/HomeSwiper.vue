<template>
<!-- 轮图插件 -->
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index" class="swiper-item">
      <a :href="item.link" >
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '../../../components/common/swiper'


  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default(){
          return []/*设置数据,类型,数组类型 类型为默认值return返回一个*/
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      imageLoad(){
        if (!this.isLoad) {
          this.$emit('swipperImageLoad')
          this.isLoad = true
        }
        // console.log("-----");
      }
    }
  }
</script>

<style scoped>
.swiper-item img{
  width: 100%;
}
</style>