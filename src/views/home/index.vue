<template>
  <div class="mod-home">
    <div class="hot-wrap">
        <hot :list="hot"></hot>
    </div>
    <list :list="allList" @showPopup="showPopup"></list>
    <anchor :list="allList"></anchor>
    <popup-view :isShow="visible" :current="current" :list="modelList" @close="closePopup"></popup-view>
  </div>
</template>

<script>
import { ViewBox } from 'vux'
import Hot from '@/components/Hot'
import List from '@/components/List'
import Anchor from '@/components/Anchor'
import PopupView from '@/components/PopupView'
export default {
  name: 'Home',
  data () {
    return {
      hot: [], // 热门品牌
      allList: [], // 所有列表
      visible: false, // popup显示标志
      modelList: [], // 二级列表
      current: {} // 当前选中项
    }
  },
  components: {
    ViewBox,
    Hot,
    List,
    Anchor,
    PopupView
  },
  created () {
    this.fetchHotData()
    this.fetchListData()
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
      this.$http.get('api/rest/lionax/selectAllCar').then(({data}) => {
        console.log(data)
        // 将所有数据按照字母分组
        this.initAllList(data)
      })
    },
    // 将所有数据按照字母分组
    initAllList (data = []) {
      let res = []
      data.forEach(item => {
        let current = res.filter(i => i.initial === item.initial)
        if (current.length) {
          current[0].data.push(item)
        } else {
          res.push(
            {
              data: [item],
              initial: item.initial
            }
          )
        }
      })
      this.allList = res
    },
    // 显示popup
    showPopup ({ list = [], current = {} }) {
      this.visible = true
      this.modelList = list
      this.current = current
    },
    // 关闭popup
    closePopup () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-home{
  position: relative;
  height: 100%;
  background: #FFD301;
  .hot-wrap{
    padding: 10px;
    margin-bottom: 10px;
  }
}
</style>

<style lang="scss">
.mod-home{
  .weui-tab__panel{
    padding-bottom: 0;
  }
}
</style>
