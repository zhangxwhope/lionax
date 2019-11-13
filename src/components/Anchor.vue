<template>
  <div class="mod-anchor">
    <div class="anchor-wrap">
      <div class="anchor-item" v-for="(item, index) in list" :key="index" @click="dumpToPos(item.initial)">
        <div class="bubble-item">{{ item.initial }}</div>
        <div class="item-wrap">
          <span>{{ item.initial }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Anchor',
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
  methods: {
    dumpToPos (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-anchor{
  position: fixed;
  right: 10px;
  top: 20%;
  .anchor-item{
    position: relative;
    color: #a2aab6;
    line-height: 1.4;
    font-size: 13px;
    padding: 0 3px;
    &.active{
      background: #dd1d21;
      color: #fff;
      border-radius: 43%;
    }
    .bubble-item{    width: 35px;
      height: 35px;
      color: #fff;
      background: #FFD301;
      position: absolute;
      left: -40px;
      border-radius: 100%;
      text-align: center;
      line-height: 35px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      // display: none;
      &:after{
        content: '';
        height: 0;
        width: 0;
        display: block;
        right: -7px;
        top: 50%;
        transform: translateY(-50%);
        border-width: 10px 0 10px 10px;
        border-style: solid;
        border-color: transparent transparent transparent #FFD301;
        position: absolute;
      }
    }
  }
}
</style>
