<template>
  <div class="mod-anchor">
    <div class="anchor-wrap">
      <div class="anchor-item"
           :class="activeAnchor === item.initial ? 'active' : ''"
           v-for="(item, index) in list"
           :key="index"
           @click="dumpToPos(item.initial)">
        <div class="bubble-item" :class="activeAnchor === item.initial && showBubble ? 'show-bubble' : ''">{{ item.initial }}</div>
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
      activeAnchor: '',
      scrollTop: '',
      listHeight: [],
      showBubble: false
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
  mounted () {
    window.addEventListener('scroll', () => {
      this.scrollTop = document.documentElement.scrollTop
    })
    this.calculateHeight()
  },
  watch: {
    list () {
      this.calculateHeight()
    },
    scrollTop (val) {
      this.setHighlight(val)
    }
  },
  methods: {
    dumpToPos (item) {
      this.activeAnchor = item
      this.showBubble = true
      let obj = document.getElementById(item)
      let oPos = obj.offsetTop
      document.documentElement.scrollTop = oPos
      document.body.scrollTop = oPos
      setTimeout(() => {
        this.showBubble = false
      }, 500)
    },
    setHighlight (val) {
      for (let i = 0; i < this.listHeight.length - 1; i++) { // 循环看落在哪一个区间
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (val >= height1 && val < height2)) {
          this.activeAnchor = this.list[i].initial
        }
      }
    },
    calculateHeight () {
      this.listHeight = []
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i]
        let height = document.getElementById(item.initial).offsetTop
        this.listHeight.push(height)
      }
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
    .bubble-item{
      width: 35px;
      height: 35px;
      color: #fff;
      background: #FFD301;
      position: absolute;
      left: -50px;
      border-radius: 100%;
      text-align: center;
      line-height: 35px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      display: none;
      &.show-bubble{
        display: block;
      }
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
