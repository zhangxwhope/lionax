<template>
  <div class="mod-dialog">
    <x-dialog :show="visible">
      <h4 class="dialog-title">免责声明</h4>
      <p class="dialog-content">壳牌在考虑原厂推荐、车辆配置、技术特点、车龄里程等参数条件下,根据壳牌产品的技术特点和优势,建议并推荐适配车型的润滑油产品。</p>
      <p class="dialog-content">在用户选择产品之前,核实车辆配置信息和原厂推荐机油标准是首要前提。</p>
      <p class="dialog-content">具体用油标准请以车主保养手册或原厂技术公告信息为准。</p>
      <div class="protocal-btn" @click="agree">我已阅读并同意免责声明</div>
    </x-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { XDialog } from 'vux'
export default {
  name: 'ProtocalDialog',
  data () {
    return {

    }
  },
  components: {
    XDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations([
      'updateProtocalAgree'
    ]),
    agree () {
      this.updateProtocalAgree(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-dialog{
  .dialog-title{
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 12px;
  }
  .dialog-content{
    font-size: 14px;
    text-align: left;
    line-height: 1.6;
    padding: 0 4%;
  }
  .protocal-btn{
    width: 100%;
    background: #FFD301;
    color: #fff;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    margin-top: 100px;
  }
}
</style>

<style lang="scss">
.mod-dialog{
  .weui-dialog{
    width: 90%;
    max-width: 320px;
    padding: 20px 0 0;
    background: #fff;
    border-radius: 3px;
  }
}
</style>
