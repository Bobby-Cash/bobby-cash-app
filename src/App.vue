<template>
<ReloadPWA />

<NetworkOfflineScreen v-if="!isOnline" />

<div v-if="isOnline">
  <div v-if="isStandaloneOrSkipInstall && accountExists">
    <Navbar />

    <div class="container-fluid">
      <RouterView />
    </div>
  </div>

  <InstallAppScreen v-if="!isStandalone && !skipInstallScreen" @skipInstall="skipInstall" />
  <AccountCreateScreen v-if="isStandaloneOrSkipInstall && !accountExists" @setAccountExists="setAccountExists" />
</div>
</template>

<script>
import { RouterView } from 'vue-router'
import ReloadPWA from './components/ReloadPWA.vue'
import Navbar from './components/Navbar.vue';
import InstallAppScreen from './components/InstallAppScreen.vue';
import AccountCreateScreen from './components/AccountCreateScreen.vue';
import NetworkOfflineScreen from './components/NetworkOfflineScreen.vue';
import useStorageFlags from './composables/storageFlags.js';
import useZkbobHelpers from './composables/zkbob.js';

export default {
  name: 'App',

  components: {
    AccountCreateScreen,
    InstallAppScreen,
    Navbar,
    NetworkOfflineScreen,
    ReloadPWA,
    RouterView,
  },

  data() {
    return {
      accountExists: false,
      skipInstallScreen: false
    }
  },

  mounted() {
    this.checkIfSkipInstall();
    window.localStorage.setItem(this.getSessionIdFlag(), crypto.randomUUID());

    // initialize zkBob client
    this.initClient();
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

    isOnline() {
      return window.navigator.onLine;
    },

    isStandalone() {
      return this.getPWADisplayMode === 'standalone';
    },

    isStandaloneOrSkipInstall() {
      return this.isStandalone || this.skipInstallScreen;
    },
  },

  methods: {
    checkIfAccountExists() {
      // check if user has an account
      const spendingKey = window.localStorage.getItem(this.getSpendingKeyFlag());
      const mnemonic = window.localStorage.getItem(this.getMnemonicFlag());

      if (spendingKey && mnemonic) {
        this.accountExists = true;
      }
    },

    checkIfSkipInstall() {
      // check if user has the skip install flag set
      const skipInstall = window.localStorage.getItem(this.getSkipInstallFlag());
      if (skipInstall) {
        this.skipInstallScreen = true;
      }
    },

    skipInstall() {
      // set flag to skip install screen
      window.localStorage.setItem(this.getSkipInstallFlag(), true);
      this.skipInstallScreen = true;
    },

    setAccountExists() {
      this.accountExists = true;
    },
  },

  setup() {
    const { getMnemonicFlag, getSessionIdFlag, getSkipInstallFlag, getSpendingKeyFlag } = useStorageFlags();
    const { initClient } = useZkbobHelpers();

    return {
      getMnemonicFlag,
      getSessionIdFlag,
      getSkipInstallFlag,
      getSpendingKeyFlag,
      initClient
    }
  },
}
</script>
