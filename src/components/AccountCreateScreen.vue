<template>
<div class="container d-flex w-100 h-100 p-3 mx-auto flex-column justify-content-center d-flex">

  <div class="d-flex justify-content-center mt-5">
    <img class="logo-install" src="@/assets/img/logo.svg" />
  </div>

  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-secondary btn-lg btn-install">
      Create a new account
    </button>
  </div>

  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-secondary btn-lg btn-install">
      Recover account
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: 'AccountCreateScreen',
}
</script>