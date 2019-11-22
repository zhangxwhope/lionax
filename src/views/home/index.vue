<template>
  <div class="mod-home" :class="visible ? 'noscroll' : ''">
    <div class="hot-wrap">
        <hot :list="hot" @showPopup="showPopup"></hot>
    </div>
    <list :list="allList" @showPopup="showPopup"></list>
    <anchor :list="allList"></anchor>
    <popup-view :isShow="visible" :current="current" :list="modelList" @close="closePopup"></popup-view>
    <loading :show="isLoading" :text="loadingText"></loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Loading } from 'vux'
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
    Loading,
    Hot,
    List,
    Anchor,
    PopupView
  },
  computed: {
    ...mapState([
      'baseUrl'
    ]),
    ...mapState('vux', [
      'isLoading',
      'loadingText'
    ])
  },
  created () {
    this.fetchData()
  },
  methods: {
    ...mapMutations('vux', [
      'updateLoadingStatus'
    ]),
    async fetchData () {
      this.updateLoadingStatus({ isLoading: true })
      await this.fetchHotData()
      await this.fetchListData()
      this.updateLoadingStatus({ isLoading: false })
    },
    // 获取热门品牌
    async fetchHotData () {
      await this.$http.get(`${this.baseUrl}/rest/lionax/selectHotCar`).then(({data}) => {
        console.log(data)
        this.hot = data
      })
    },
    // 获取列表数据
    async fetchListData () {
      await this.$http.get(`${this.baseUrl}/rest/lionax/selectAllCar`).then(({data}) => {
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
    async showPopup (item) {
      await this.getModelList(item)
      this.visible = true
    },
    // 关闭popup
    closePopup () {
      this.visible = false
    },
    async getModelList (item) {
      this.current = item
      this.updateLoadingStatus({ isLoading: true })
      await this.fetchModelList()
      this.updateLoadingStatus({ isLoading: false })
    },
    // 根据carId获取modelList
    async fetchModelList () {
      await this.$http.get(`${this.baseUrl}/rest/lionax/selectModelListByCarId/${this.current.carId}`).then(({data}) => {
        console.log(data)
        this.modelList = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-home{
  position: relative;
  height: 100%;
  background: #FFD301;
  &.noscroll{
    height: 100vh;
    overflow: hidden;
  }
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
