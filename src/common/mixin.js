//混入,并未使用

export const itemListenerMixin = {
  debounce(func,delay){
    let timer = null
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this , args)
      }, delay)
    }
  },
  mounted() {
    let refresh = this.debounce(this.$refs.scroll.refresh, 200)

    //3.监听item中图片加载完成,刷新refresh()
    //对监听的事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('jfiosfj');
  }
}