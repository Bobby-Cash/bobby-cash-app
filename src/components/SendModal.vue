<template>
  <div class="modal fade" id="sendModal" tabindex="-1" aria-labelledby="sendModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="sendModalLabel">Send USDC</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="form-group">
  
              <div class="input-group mb-3">
                <span class="input-group-text">$</span>
                <input 
                  v-model="amount"
                  type="text" 
                  class="form-control form-control-lg" 
                />
                <span class="input-group-text">USDC</span>
              </div>
  
              <QrScan 
                v-if="showQrScanner"
                class="mb-2" 
                @result="parseResult" 
                @closeScanner="closeScanner"
              />
  
              <div class="input-group mb-3">
                <input 
                  v-model="recipient"
                  type="text" 
                  class="form-control form-control-lg" 
                  placeholder="Recipient's zk address" 
                />
  
                <button @click="showQrScanner=true;" class="btn btn-dark" type="button" id="button-addon2">
                  <i class="bi bi-qr-code-scan"></i>
                </button>
  
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-lg">Send USDC</button> 
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import QrScan from './QrScan.vue';
  
  export default {
    name: 'SendModal',
  
    data() {
      return {
        amount: "",
        recipient: "",
        showQrScanner: false
      }
    },
  
    components: {
      QrScan
    },
  
    methods: {
      closeScanner() {
        this.showQrScanner = false;
      },
  
      parseResult(result) {
        console.log('parseResult', result);
        this.recipient = result;
        this.showQrScanner = false;
      },
  
      sendTokens() {
        console.log('sendTokens');
      }
    }
  }
  </script>