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
    name: "Profile",
    components: {
      Scroll
    }
  }
</script>

<style scoped>
.content {
  height: 400px;
  overflow: hidden;
  background: red;
}
</style>
