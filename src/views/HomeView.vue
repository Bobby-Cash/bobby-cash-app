<template>
  <nav class="navbar navbar-expand-lg bg-transparent" data-bs-theme="dark">
    <div class="container-fluid d-flex justify-content-center">
      <a class="navbar-brand" href="#">
        <img src="../assets/img/logo-wide.svg" alt="Bootstrap" height="30">
      </a>
    </div>
  </nav>
  
  <div class="d-flex justify-content-center">
    <div class="card text-white bg-dark send-tokens-card">
      <div class="card-body text-center">
  
        <div class="dropdown-center">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Polygon
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Polygon</a></li>
            <li><a class="dropdown-item" href="#">Optimism</a></li>
          </ul>
        </div>
  
        <div class="mt-4">
          <h1 class="user-balance">25</h1>
          <small>USDC</small>
        </div>
  
        <div class="row gap-2 justify-content-center mt-4 mb-4">
          <button 
            type="button" 
            class="col-5 btn btn-secondary btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#sendModal"
          >
            Send
          </button>
          <button type="button" class="col-5 btn btn-info btn-lg">Receive</button>
        </div>
  
      </div>
    </div>
  </div>
  
  <div class="d-flex justify-content-center">
    <div class="card text-white bg-dark send-tokens-card">
      <div class="card-body text-center">
  
        <div class="mt-2">
          <h3>Transactions</h3>
  
          <p>Is installed: {{ isInstalled }}</p>
  
          <p>Display mode: {{ getPWADisplayMode }}</p>
        </div>
  
      </div>
    </div>
  </div>
  
  <SendModal />
  </template>
  
  <script>
  import SendModal from '../components/SendModal.vue';
  
  export default {
    name: 'HomeView',
  
    data() {
      return {
        isInstalled: false
      }
    },
  
    components: {
      SendModal
    },
  
    mounted() {
      this.checkInstalled();
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
      }
    },
  
    methods: {
      async checkInstalled() {
        console.log('checkInstalled');
        const relatedApps = await navigator.getInstalledRelatedApps();
        console.log(relatedApps);
  
        if (relatedApps.length > 0) {
          this.isInstalled = true;
        }
      }
    }
  }
  </script>