<template>
  <div class="Tab-control">
    <div v-for="(item,index) in titles"
         :key="index" class="Tab-control-item"
         :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0/*搞一个currentIndex 记录当前被选中的*/
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index/*创建一个方法,监听点击事件,*/
        this.$emit('tabClick', index)/*内部向外部传数据,外部向内部传数据$props*/
      }
    }
  }
</script>

<style scoped>
  .Tab-control{
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
  }
  .Tab-control-item{
    flex: 1;
  }
  .Tab-control-item span{
    padding: 4px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-high-text);
  }

</style>