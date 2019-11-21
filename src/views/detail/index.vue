<template>
  <div class="mod-detail">
    <div class="detail-header" @click="dumpToHome">
      <span>{{ detailNav.first }} - {{ detailNav.second }}</span>
      <span class="detail-arrow">＞</span>
    </div>
    <div class="detail-content">
      <div class="content-wrap">
        <div class="content-head">
          <div class="head-flag">机油推荐</div>
          <div class="head-amount">机油加注量：<span>4L</span></div>
        </div>
        <div class="content-short">
          <div class="short-item">
            <img class="item-img" :src="`http://www.l-lionax.com${detail.lowerImage}`" alt="img">
            <p class="item-name">{{ detail.lower }}</p>
          </div>
          <div class="short-item">
            <img class="item-img" :src="`http://www.l-lionax.com${detail.highImage}`" alt="img">
            <p class="item-name">
              <span>最佳</span>
              {{ detail.high }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Detail',
  data () {
    return {
      yearId: '',
      detail: {}
    }
  },
  computed: {
    ...mapState([
      'detailNav'
    ])
  },
  created () {
    this.yearId = this.$route.params.yearId || ''
    this.fetchDetailByYearId()
  },
  methods: {
    // 获取详情
    getDetail () {

    },
    // 根据yearId获取详情数据
    async fetchDetailByYearId () {
      await this.$http.get(`api/rest/lionax/selectEngineOilListByYearId/${this.yearId}`).then(({data}) => {
        console.log(data)
        this.detail = data[0] || {}
      })
    },
    // 跳转回首页
    dumpToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-detail{
  height: 100vh;
  background: #f0eff5;
  .detail-header{
    padding: 10px 10px 50px;
    color: #fff;
    font-size: 20px;
    background: url('../../../static/images/detail-header.png') no-repeat;
    background-size: 100% 100%;
    text-align: left;
    font-weight: 800;
  }
  .detail-content{
    padding: 10px;
    margin-top: -50px;
  }
  .content-wrap{
    background: #fff;
    border-radius: 4px;
    padding: 20px 10px;
  }
  .content-head{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .head-flag{
    position: relative;
    color: #fff;
    height: 32px;
    line-height: 32px;
    padding: 0 26px 0 16px;
    margin-left: -20px;
    background: #DD1D21;
    border-radius: 2px;
    font-size: 18px;
    &:after{
      content: '';
      position: absolute;
      right: -1px;
      top: 0;
      width: 0;
      height: 0;
      border-top: 16px solid transparent;
      border-bottom: 16px solid transparent;
      border-right: 10px solid #fff;
    }
  }
  .head-amount{
    color: #999;
    span{
      color: #D21D25;
    }
  }
  .content-short{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .short-item{
    width: 180px;
  }
  .item-img{
    width: 100%;
  }
  .item-name{
    text-align: left;
    font-size: 15px;
    border-bottom: 4px solid #DD1D21;
    padding-bottom: 10px;
    span{
      font-size: 12px;
      padding: 0 4px;
      color: #DD1D21;
      border: 1px solid #DD1D21;
    }
  }
}
</style>
