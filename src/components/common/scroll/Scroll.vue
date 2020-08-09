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
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }

    },
    /*滚动*/
    mounted() {
      /*1.创建scroll对象*/
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      /*2.监听滚动事件*/
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll',position)
      })
      this.scroll.refresh()

      /*3.监听上拉加载更多*/
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp',)
      })
    },
    methods: {
      /*封装一个返回顶部的方法*/
      scrollTo(x,y,time = 1000) {
        this.scroll && this.scroll.scrollTo(x , y , time)
      },
      /**/
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      /*刷新图片*/
      refresh(){
        // console.log("----");
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>