<template>
  <div id="app" class="bg-light" v-cloak>

    <cosmos-header></cosmos-header>
    <burguer-menu></burguer-menu>

    <security-view></security-view>
    <data-stream-view></data-stream-view>

  </div>
</template>

<script>

  import HelloWorld from './components/HelloWorld.vue'
  import PrimerComponente from './components/PrimerComponente.vue'
  import BurguerMenu from './components/BurguerMenu.vue'
  import Sarasa from './components/Sarasa.vue'
  import Header from './components/Header.vue'
  import SecurityView from './components/SecurityView.vue'
  import DataStreamView from './components/DataStreamView.vue'

  export default {

  name: 'App',
    components: {
      'data-stream-view': DataStreamView,
      'security-view': SecurityView,
      'cosmos-header': Header,
      'burguer-menu': BurguerMenu,
      HelloWorld,
      PrimerComponente,
      'sara-sa': Sarasa
  },
  data () {
    return {

    }
  }

  }
</script>

<style>
  /* darle tiempo a que renderice */
  [v-cloak]{
    display: none;
  }

  #app {
    font-family: Ubuntu;
  }
</style>
