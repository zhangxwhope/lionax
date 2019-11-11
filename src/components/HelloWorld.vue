<template>
  <div class="hello">
    <group>
      <cell title="title" value="value"></cell>
    </group>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Group, Cell, Loading } from 'vux'
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  components: {
    Group,
    Cell,
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get('http://172.16.0.121:8080/hms/user.do?action=getUserSysMenu&rybm=932368805&fcode=0102&cdlx=2').then(({data}) => {
        console.log(data)
      })
    },
    alert () {
      this.$vux.alert.show({
        title: 'Vux is Cool',
        content: 'Do you agree?'
      })
    }
  }
}
</script>

<style scoped>

</style>
