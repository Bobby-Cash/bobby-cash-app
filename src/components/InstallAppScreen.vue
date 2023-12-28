<template>
<div class="container d-flex w-100 h-100 p-3 mx-auto flex-column justify-content-center d-flex">

  <div class="d-flex justify-content-center mt-4">
    <img class="logo-install" src="../assets/img/logo.svg" />
  </div>

  <div class="d-flex justify-content-center">
    <p class="text-center ps-5 pe-5">
      Send and receive USDC privately via the zkBob protocol.
    </p>
  </div>

  <div class="d-flex justify-content-center mt-4">
    <button 
      class="btn btn-secondary btn-lg btn-install" 
      data-bs-toggle="modal" 
      data-bs-target="#installAppModal"
      @click="showInstallPrompt"
    >
      Install as app
    </button>
  </div>

  <div class="row mt-5 text-center pt-5">
    <p @click="skip">Skip and continue in browser</p>
  </div>

</div>

<!-- Modal -->
<div class="modal fade" id="installAppModal" tabindex="-1" aria-labelledby="installAppModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="installAppModalLabel">How to install as app</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ol>
          <li class="mb-2">Click install in the pop-up that just appeared.</li>
          <li class="mb-2">If the pop-up did not appear, find three dots in the corner of your browser.</li>
          <li class="mb-2">Select "Install" or "Install app".</li>
          <li>After installation, close this browser tab and open the app from your apps directory.</li>
        </ol>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'InstallAppScreen',
  emits: ['skipInstall'],

  data() {
    return {
      installPrompt: null,
    }
  },

  mounted() {
    this.setInstallPrompt()
  },

  methods: {
    setInstallPrompt() {
      window.addEventListener('beforeinstallprompt', (e) => {
        // ! Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        // Stash the event so it can be triggered later.
        this.installPrompt = e
      })
    },

    showInstallPrompt() {
      if (this.installPrompt) {
        this.installPrompt.prompt();

        /*
        this.installPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt')
          } else {
            console.log('User dismissed the install prompt')
          }
        })
        */
      }
    },

    skip() {
      this.$emit('skipInstall');
    }
  }
}
</script>