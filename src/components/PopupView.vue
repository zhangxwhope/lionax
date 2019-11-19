<template>
  <div class="mod-popup">
    <popup height="50%" :value="isShow" :hide-on-blur="false">
      <div class="popup-header">
        <div class="breadcrumb-nav">
          奥迪
        </div>
        <div class="popup-close">X</div>
      </div>
      <div class="popup-content">
        <div class="popup-item" v-for="(item, index) in list" :key="index">
          <span>{{ item.modelName }}</span>
          <span>></span>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { Popup } from 'vux'
export default {
  name: 'PopupView',
  data () {
    return {

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
  }
}
</style>

<style lang="scss">
.mod-popup{
  .vux-popup-dialog{
    box-sizing: border-box;
    padding: 0 10px;
  }
}
</style>
