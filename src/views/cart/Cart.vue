<template>
  <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{ length }})</div>
      </nav-bar>
      <!--商品列表-->
      <cart-list></cart-list>
      <!--底部汇总-->
      <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";//导航组件
  import CartList from "./childComps/CartList";//商品列表
  import CartButtonBar from "./childComps/CartButtonBar";//购物车底部汇总工具栏


  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartButtonBar

    },
    computed: {
      //mapGetters在vue中用computed计算属性接收这些公共状态
      // 1.第一种语法
      // ...mapGetters(['cartLength'])
      //2.
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }
</style>
