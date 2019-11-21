<template>
  <div class="mod-hot">
    <h5 class="hot-title">热门品牌</h5>
    <grid class="hot-grid" :cols="5" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item v-for="(item, index) in list"
                 :key="index">
        <div class="grid-item" @click="showPopup(item)">
          <img class="grid-img" :src="`${rootPath}${item.carLog}`" alt="icon">
          <div class="grid-name">{{ item.carName }}</div>
        </div>
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Grid, GridItem } from 'vux'
export default {
  name: 'Hot',
  data () {
    return {

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
    Grid,
    GridItem
  },
  computed: {
    ...mapState([
      'rootPath'
    ])
  },
  methods: {
    showPopup (item) {
      this.$emit('showPopup', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-hot{
  background: #fff;
  border-radius: 6px;
  .hot-title{
    font-size: 20px;
    text-align: left;
    font-weight: normal;
    padding-left: 22px;
    padding-top: 18px;
  }
  .grid-img{
    width: 36px;
  }
  .grid-name{
    color: #555;
    font-size: 14px;
  }
}
</style>

<style lang="scss">
.mod-hot{
  .weui-grids:before{
    border-top: none;
  }
  .weui-grid:after{
    border-bottom: none;
  }
  .weui-grid{
    padding-top: 12px;
  }
}
</style>
