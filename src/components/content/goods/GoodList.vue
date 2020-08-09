<template>
   <div class="goods">
     <good-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></good-list-item>
   </div>
</template>

<script>
  import GoodListItem from "./GoodListItem";

  export default {
    name: "Goodlist",
    components: {
      GoodListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    /*  让弹性盒元素在必要的时候拆行*/
    display: flex;
    flex-wrap: wrap;
    /*   项目位于各行之前、之间、之后都留有空白的容器内。*/
    justify-content: space-around;
  }

</style>