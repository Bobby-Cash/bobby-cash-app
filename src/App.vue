<template>
<ReloadPWA />

<div v-if="isStandalone || skipInstallScreen">
  <Navbar />

  <div class="container-fluid">
    <RouterView />
  </div>
</div>

<InstallAppScreen v-if="!isStandalone && !skipInstallScreen" @skipInstall="skipInstall" />
  
</template>

<script>
import { RouterView } from 'vue-router'
import ReloadPWA from './components/ReloadPWA.vue'
import Navbar from './components/Navbar.vue';
import InstallAppScreen from './components/InstallAppScreen.vue';

export default {
  name: 'App',

  components: {
    InstallAppScreen,
    Navbar,
    ReloadPWA,
    RouterView,
  },

  data() {
    return {
      skipInstallFlag: 'SkipInstall',
      skipInstallScreen: false,
    }
  },

  mounted() {
    this.checkIfSkipInstall();
  },

  computed: {
    getPWADisplayMode() {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (document.referrer.startsWith('android-app://')) {
        return 'twa';
      } else if (navigator.standalone || isStandalone) {
        return 'standalone';
      }
      return 'browser';
    },

    isStandalone() {
      return this.getPWADisplayMode === 'standalone';
    },
  },

  methods: {
    checkIfSkipInstall() {
      // check if user has the skip install flag set
      const skipInstall = window.localStorage.getItem(this.skipInstallFlag);
      if (skipInstall) {
        this.skipInstallScreen = true;
      }
    },

    skipInstall() {
      // set flag to skip install screen
      window.localStorage.setItem(this.skipInstallFlag, true);
      this.skipInstallScreen = true;
    },
  },
}
</script>
