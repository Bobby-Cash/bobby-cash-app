<template>
<div v-if="needRefresh" class="alert alert-primary text-center" role="alert">

  <div class="row ps-4 pe-4 text-center">
    <p>New version available, click on the Reload button to update.</p>
  </div>

  <div class="d-inline-flex gap-2 text-center">
    <button @click="close" class="btn btn-primary btn-sm">Close</button>
    <button @click="updateSw()" class="btn btn-secondary btn-sm">Reload</button>
  </div>
  
</div>
</template>

<script>
import { defineComponent } from "vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
const { updateServiceWorker } = useRegisterSW();
export default defineComponent({
  name: "ReloadPWA",
  setup() {
    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();
    const close = async () => {
      offlineReady.value = false;
      needRefresh.value = false;
    };
    return { offlineReady, needRefresh, updateServiceWorker, close };
  },
  methods: {
    async close() {
      this.offlineReady.value = false;
      this.needRefresh.value = false;
    },

    async updateSw() {
      await updateServiceWorker();
    },
  },
});
</script>