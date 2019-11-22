<template>
  <div class="mod-popup">
    <popup height="60%"
          :value="isShow"
          :hide-on-blur="false"
          :should-rerender-on-show="true"
          @on-hide="clearData">
      <div class="popup-header">
        <div class="bread-nav-wrap">
          <img v-if="breadcrumbNav[0] && breadcrumbNav[0].img" class="bread-nav-img" :src="`${rootPath}${breadcrumbNav[0].img}`" alt="icon">
          <div class="breadcrumb-nav">
            <span v-for="(nav, index) in breadcrumbNav" :key="nav.level" class="nav-item">
              <span class="nav-name"
                    :class="index !== breadcrumbNav.length - 1 ? 'active' : ''"
                    @click="backToPrev(nav)">
                {{ nav.name }}
              </span>
              <span v-if="index !== breadcrumbNav.length - 1" class="nav-arrow">＞</span>
            </span>
          </div>
        </div>
        <x-icon class="popup-close" type="ios-close-empty" size="40" @click="closePopup"></x-icon>
        <!-- <div class="popup-close vux-close" @click="closePopup"></div> -->
      </div>
      <div class="popup-content">
        <div class="popup-item"
             v-for="(item, index) in isSecond ? list : (isThird ? salesList : yearList)"
             :key="index"
             @click="getList(item)">
          <span class="popup-item-name">{{ isSecond ? item.modelName : (isThird ? item.salesName : item.yearName) }}</span>
          <!-- <span class="popup-item-arrow">＞</span> -->
          <x-icon class="popup-item-arrow" type="ios-arrow-forward"></x-icon>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Popup } from 'vux'
export default {
  name: 'PopupView',
  data () {
    return {
      salesList: [], // 三级列表
      modelId: '', // 当前二级
      yearList: [], // 四级列表
      salesId: '', // 当前三级
      yearId: '', // 当前四级
      breadcrumbNav: [] // 面包屑导航数据
    }
  },
  components: {
    Popup
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    isShow: {
      type: Boolean,
      default: false
    },
    current: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapState([
      'rootPath',
      'baseUrl'
    ]),
    // 当前是否显示二级列表
    isSecond () {
      return this.modelId === ''
    },
    // 当前是否显示三级列表
    isThird () {
      return this.modelId !== '' && this.salesId === ''
    }
  },
  watch: {
    isShow (val) {
      if (val) {
        this.initBreadcrumbNav()
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateDetailNav'
    ]),
    // 获取对应列表数据
    getList (item) {
      let { modelId, salesId, yearId } = item
      if (yearId) {
        this.yearId = yearId
        // 跳转至详情页面
        const detailNav = this.breadcrumbNav.filter((nav, index) => index <= 1).map(nav => nav.name)
        this.updateDetailNav({
          first: detailNav[0] || '',
          second: detailNav[1] || ''
        })
        this.$router.push(`/detail/${yearId}`)
        return
      }
      if (salesId) {
        this.getYearList(item)
        return
      }
      if (modelId) {
        this.getSalesList(item)
      }
    },
    async getSalesList (item) {
      let { modelId, modelName } = item
      this.modelId = modelId
      this.breadcrumbNav.push({
        id: modelId,
        name: modelName,
        img: '',
        level: 2
      })
      await this.fetchSalesList()
    },
    // 根据modelId获取salesList
    async fetchSalesList () {
      await this.$http.get(`${this.baseUrl}/rest/lionax/selectSalesListByModelId/${this.modelId}`).then(({data}) => {
        console.log(data)
        this.salesList = data
      })
    },
    async getYearList (item) {
      let { salesId, salesName } = item
      this.salesId = salesId
      this.breadcrumbNav.push({
        id: salesId,
        name: salesName,
        img: '',
        level: 3
      })
      await this.fetchYearList()
    },
    // 根据salesId获取yearList
    async fetchYearList () {
      await this.$http.get(`${this.baseUrl}/rest/lionax/selectYearListBySalesId/${this.salesId}`).then(({data}) => {
        console.log(data)
        this.yearList = data
      })
    },
    // 初始化设置面包屑导航数据
    initBreadcrumbNav () {
      let { carId, carName, carLog } = this.current
      this.breadcrumbNav.push({
        id: carId,
        name: carName,
        img: carLog,
        level: 1
      })
    },
    // 删除对应的面包屑中的数据层
    deleteBreadcrumbNav (level) {
      this.breadcrumbNav = this.breadcrumbNav.filter(item => item.level <= level)
    },
    // 面包屑导航点击返回上一层
    backToPrev (nav) {
      let { level } = nav
      switch (level) {
        case 1:
          this.modelId = ''
          this.salesId = ''
          break
        case 2:
          this.salesId = ''
          break
        case 3:
          break
      }
      this.deleteBreadcrumbNav(level)
    },
    // 关闭弹框
    closePopup () {
      this.$emit('close')
    },
    // 清除数据
    clearData () {
      this.breadcrumbNav = []
      this.salesList = []
      this.yearList = []
      this.modelId = ''
      this.salesId = ''
      this.yearId = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-popup{
  .popup-header{
    position: fixed;
    width: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 46px;
    // line-height: 46px;
    border-bottom: 1px solid #ddd;
  }
  .popup-content{
    height: calc(100% - 46px);
    margin-top: 46px;
    overflow: auto;
  }
  .popup-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 56px;
    font-size: 18px;
    border-bottom: 1px solid #ddd;
    &:last-child{
      border-bottom: none;
    }
  }
  .breadcrumb-nav{
    text-align: left;
    font-size: 14px;
    color: #555;
  }
  .nav-arrow{
    margin: 0 5px;
    color: #ccc;
  }
  .nav-name{
    &.active{
      color: #dd1d21;
    }
  }
  .bread-nav-wrap{
    display: flex;
    align-items: center;
  }
  .bread-nav-img{
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .popup-close{
    margin-left: 10px;
  }
  .popup-close, .popup-item-arrow{
    color: #ccc;
    fill: #ccc;
    font-size: 14px;
  }
  .popup-item-name{
    text-align: left;
  }
}
</style>

<style lang="scss">
.mod-popup{
  .vux-popup-dialog{
    box-sizing: border-box;
    padding: 0 10px;
    background: #fff;
  }
}
</style>
