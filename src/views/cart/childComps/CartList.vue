<template>
  <div class="cart-list">
    <scroll class="content">
<!--      <li v-for="(item, index) in cartList" :key="index">{{item}}</li>//直接显示拿到的数据-->
      <cart-list-item v-for="(item, index) in cartList"
                      :item-info="item"
                      :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";//外界滚动组件
  import CartListItem from "./CartListItem";//组件样式

  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>