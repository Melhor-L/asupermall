<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg">
      </div>
      <div slot="center" class="titles">
      <div v-for="(item,index) in titles"
           :key="index"
           class="titles-item"
           :class="{active: index === currentIndex}"
           @click="titlesClick(index)">{{ item }}</div>
    </div>
    </nav-bar>
  </div>

</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品' , '参数' , '评论' , '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titlesClick(index) {
        this.currentIndex = index
        this.$emit('titlesClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
  }
  .titles-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 12px;
  }
</style>