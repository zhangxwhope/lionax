<template>
  <div class="mod-list">
    <div class="list-wrap">
      <div class="list-item" v-for="(item, index) in list" :key="index" :id="item.initial">
        <div class="list-kind">{{ item.initial }}</div>
        <div class="list-detail">
          <div class="detail-item" v-for="(detail, idx) in item.data" :key="idx" @click="getModelList(detail.carId)">
            <img class="detail-img" :src="`http://www.l-lionax.com${detail.carLog}`" alt="icon">
            <div class="detail-name">{{ detail.carName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      carId: '', // 当前一级
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
  methods: {
    async getModelList (carId) {
      this.carId = carId
      await this.fetchModelList()
      this.$emit('showPopup', this.modelList)
    },
    // 根据carId获取modelList
    async fetchModelList () {
      await this.$http.get(`api/rest/lionax/selectModelListByCarId/${this.carId}`).then(({data}) => {
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
