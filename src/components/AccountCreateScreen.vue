<template>
<div class="container d-flex w-100 h-100 p-3 mx-auto flex-column justify-content-center d-flex">

  <div class="d-flex justify-content-center mt-5">
    <img class="logo-install" src="../assets/img/logo.svg" />
  </div>

  <div class="d-flex justify-content-center mt-3">
    <button 
      class="btn btn-secondary btn-lg btn-install"
      data-bs-toggle="modal" 
      data-bs-target="#termsModal" 
      @click="createNewAccount"
    >
      Create a new account
    </button>
  </div>

  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-info btn-lg btn-install">
      Recover account
    </button>
  </div>
</div>

<!-- Create Account (Terms) Modal -->
<div class="modal fade" id="termsModal" data-bs-theme="dark" tabindex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="termsModalLabel">Terms and conditions</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
          <p>If you wish to use this app, you must agree to the following terms:</p>
          <ol>
            <li>I acknowledge this is a hot wallet and thus less secure than hardware wallets.</li>
            <li>I will use this app for small amounts of USDC only.</li>
            <li>I understand this app is free and open-source software that I use at my own risk.</li>
          </ol>
        </div>

        <div class="d-flex justify-content-center mt-4 mb-3">
          <button v-if="generating" class="btn btn-secondary btn-lg btn-install" disabled>
            <span class="spinner-border spinner-border-sm me-2 align-baseline" role="status" aria-hidden="true"></span>
            <span>Creating account</span>
          </button>
          
          <button v-if="!generating" class="btn btn-secondary btn-lg btn-install">
            I agree
          </button>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ethers } from 'ethers';
import useStorageFlags from '../composables/storageFlags.js';
import useZkbobHelpers from '../composables/zkbob.js';

export default {
  name: 'AccountCreateScreen',
  emits: ['setAccountExists'],

  data() {
    return {
      generating: false,
      mnemonicSeed: null,
      spendingKey: null,
    }
  },

  methods: {
    agree() {
      // TODO: store mnemonic and spending key to local storage
      this.$emit('setAccountExists', true);
    },

    createNewAccount() {
      this.generating = true;

      console.log('createNewAccount');
      
      if (this.mnemonicSeed === null || this.spendingKey === null) {
        console.log('generating new account');

        // generate mnemonic seed using ether.js
        this.mnemonicSeed = ethers.Wallet.createRandom().mnemonic.phrase;

        // generate spending key
        this.spendingKey = this.deriveSpendingKey(this.mnemonicSeed);
        console.log('spendingKey:', this.spendingKey);

        // login user (check if account exists?)
      }
      
      // don't store to local storage yet. Wait for user to confirm.
      this.generating = false;
    }
  },

  setup() {
    const { getMnemonicFlag, getSpendingKeyFlag, getSomeVar } = useStorageFlags();
    const { deriveSpendingKey, getClient } = useZkbobHelpers();

    return {
      deriveSpendingKey,
      getClient,
      getMnemonicFlag,
      getSpendingKeyFlag,
      getSomeVar
    }
  },
}
</script>