<template>
  <div class="button-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      <span >合计: {{totalPrice}}</span>
    </div>
    <div class="calculate">
      <span >去计算({{checklength}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  export default {
    name: "cartButtonBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        // console.log(item);
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.nowprice * item.count
        }, 0).toFixed(2)
      },
      checklength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
        for (let item of this.$store.state.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
      //   return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
    },
    methods: {
      checkClick() {
        // console.log('----');
        if(this.isSelectAll) {//全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else  {//部分或全部不选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>

  .button-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    /*bottom: 40px;*/
    display: flex;
  }
  .check-content {
    display: flex;
    align-items: center;/*居中对齐弹性盒的各项*/
    margin-left: 10px;
  }
  .check-button{
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
  }
</style>