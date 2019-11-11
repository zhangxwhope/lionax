<template>
  <div class="mod-hot">
    <grid :cols="5" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item v-for="(item, index) in list"
                 :key="index"
                 :label="item.carName"
                 :icon="`http://www.l-lionax.com${item.carLog}`"></grid-item>
    </grid>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
.mod-hot{

}
</style>

<style lang="scss">
.mod-hot{
  .weui-grid:after{
    border-bottom: none;
  }
}
</style>
