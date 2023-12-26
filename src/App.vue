<template>
  <ReloadPWA />
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
import ReloadPWA from './components/ReloadPWA.vue'

export default {
  name: 'App',
  components: {
    ReloadPWA,
    RouterView,
  },
}
</script>
