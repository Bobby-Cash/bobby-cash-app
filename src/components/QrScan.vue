<template>
  <div>
    <QrStream @decode="onDecode" class="img-thumbnail" />
    <div class="text-center">
      <button class="btn btn-danger btn-sm mt-1" @click="close">Close</button>
    </div>
  </div>
  </template>
  
  <script>
  import { QrStream } from 'vue3-qr-reader';
  
  export default {
    name: "QrScan",
    emits: ["closeScanner", "result"],
  
    components: {
      QrStream
    },
  
    methods: {
      close() {
        this.$emit("closeScanner");
      },
  
      onDecode(data) {
        this.$emit("result", data);
      }
    }
  }
  </script>