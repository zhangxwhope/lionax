<template>
  <div class="mod-popup">
    <popup :value="isShow" :hide-on-blur="false">
      Popup
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

}
</style>
