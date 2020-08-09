<template>
  <div>
    <h1>待开发</h1>

    <Scroll class="content"
            ref="scroll"
            :proba-type="3"
            :pull-up-load="true">
      <ul>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
        <li>1222</li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";

  export default {
    name: "Category",
    components: {
      Scroll
    }
  }
    /*当前组件的生命周期*/
    /*
    created 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    mounted在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    */
</script>

<style scoped>
  .content {
    height: 400px;
    overflow: hidden;
    background: red;
  }
</style>
