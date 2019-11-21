<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'rootPath'
    ])
  },
  created () {
    const isDev = process.env.NODE_ENV === 'development'
    const url = isDev ? 'api' : this.rootPath
    this.updateBaseUrl(url)
  },
  methods: {
    ...mapMutations([
      'updateBaseUrl'
    ])
  }
}
</script>

<style>
html, body {
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.weui-mask_transparent{
  background: #fefefe;
}
</style>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
</style>
