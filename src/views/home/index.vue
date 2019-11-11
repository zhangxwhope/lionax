<template>
  <div class="mod-home">
    <view-box ref="viewBox">
      <Hot :list="hot"></Hot>
      <List></List>
    </view-box>
  </div>
</template>

<script>
import { ViewBox } from 'vux'
import Hot from '@/components/Hot'
import List from '@/components/List'
export default {
  name: 'Home',
  data () {
    return {
      hot: [] // 热门品牌
    }
  },
  components: {
    ViewBox,
    Hot,
    List
  },
  created () {
    this.fetchHotData()
  },
  methods: {
    // 获取热门品牌
    fetchHotData () {
      this.$http.get('api/rest/lionax/selectHotCar').then(({data}) => {
        console.log(data)
        this.hot = data
      })
    },
    // 获取列表数据
    fetchListData () {

    }
  }
}
</script>

<style lang="scss" scoped>
.mod-home{
  height: 100%;
}
</style>

<style lang="scss">
.mod-home{
  .weui-tab__panel{
    padding-bottom: 0;
  }
}
</style>
