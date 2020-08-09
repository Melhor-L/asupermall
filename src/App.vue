<template>
  <!-- <keep-alive></keep-alive> 让页面离开时不随便销毁-->
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail"><!--exclude="Detail" 把Detail排除在外 -->
      <router-view></router-view>
    </keep-alive>
    <tab-bar>
      <TabBarItem path="home">
        <img slot="item-icon" src="./assets/img/tabbar/home.svg">
        <img slot="item-icon-active" src="./assets/img/tabbar/home_active.svg">
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="category">
      <img slot="item-icon" src="./assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="./assets/img/tabbar/category_active.svg">
      <div slot="item-text">分类</div>
    </TabBarItem>
      <TabBarItem path="cart">
      <img slot="item-icon" src="./assets/img/tabbar/cart.svg">
      <img slot="item-icon-active" src="./assets/img/tabbar/cart_active.svg">
      <div slot="item-text">购物车</div>
    </TabBarItem>
      <TabBarItem path="profile">
      <img slot="item-icon" src="./assets/img/tabbar/profile.svg">
      <img slot="item-icon-active" src="./assets/img/tabbar/profile_active.svg">
      <div slot="item-text">我的</div>
    </TabBarItem>
    </tab-bar>

  </div>
</template>


<script>

import TabBar from "./components/common/tabbar/TabBar";
import TabBarItem from "./components/common/tabbar/TabBarItem";


export default {
  name: 'App',
  components: {
    TabBar,
    TabBarItem,
  }
}
</script>

<style>
  @import "./assets/css/base.css";

</style>
