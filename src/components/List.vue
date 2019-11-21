<template>
  <div class="mod-list">
    <div class="list-wrap">
      <div class="list-item" v-for="(item, index) in list" :key="index" :id="item.initial">
        <div class="list-kind">{{ item.initial }}</div>
        <div class="list-detail">
          <div class="detail-item" v-for="(detail, idx) in item.data" :key="idx" @click="getModelList(detail)">
            <img class="detail-img" :src="`${rootPath}${detail.carLog}`" alt="icon">
            <div class="detail-name">{{ detail.carName }}</div>
          </div>
        </div>
      </div>
    </div>
    <loading :show="isLoading" :text="loadingText"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'List',
  data () {
    return {
      current: '', // 当前一级
      modelList: [] // 二级列表
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState([
      'rootPath'
    ]),
    ...mapState('vux', [
      'isLoading',
      'loadingText'
    ])
  },
  methods: {
    ...mapMutations('vux', [
      'updateLoadingStatus'
    ]),
    async getModelList (item) {
      this.current = item
      this.updateLoadingStatus({ isLoading: true })
      await this.fetchModelList()
      this.updateLoadingStatus({ isLoading: false })
      this.$emit('showPopup', { list: this.modelList, current: item })
    },
    // 根据carId获取modelList
    async fetchModelList () {
      await this.$http.get(`api/rest/lionax/selectModelListByCarId/${this.current.carId}`).then(({data}) => {
        console.log(data)
        this.modelList = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-list{
  background: #fff;
  border-radius: 30px 30px 0 0;
  padding-top: 10px;
  text-align: left;
  .list-kind{
    padding: 0 20px;
    border-bottom: 1px solid #e5e5e5;
    color: #FFD301;
    font-size: 20px;
  }
  .list-item{
    padding-top: 10px;
  }
  .detail-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    line-height: 50px;
    &:last-child{
      .detail-name{
        border-bottom: none;
      }
    }
  }
  .detail-img{
    width: 28px;
  }
  .detail-name{
    width: 100%;
    margin-left: 10px;
    border-bottom: 1px solid #ddd;
  }
}
</style>
