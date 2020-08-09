<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--slot 插槽,给使用的从中插入东西,注意要给插槽命名-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>

<!--    <img src="../../assets/img/tabbar/home.svg">-->
<!--    <div>首页</div>-->
  </div>

</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data(){
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path)!==-1
      },/*动态绑定颜色, this.isActive是否处于活跃 如果是就{color: this.activeColor} 如果不是就{}*/
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;

  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
  }
  /*.active{*/
  /*  color: red;*/
  /*}*/
</style>
