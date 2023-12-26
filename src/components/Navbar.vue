<template>
<nav class="navbar bg-transparent">
  <div class="container-fluid">

    <a class="navbar-brand" href="#">
      <img src="../assets/img/logo-wide.svg" alt="Bootstrap" height="30">
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" data-bs-theme="dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">

          <li class="nav-item h2">
            <a class="nav-link text-body" href="#">Home</a>
          </li>

          <li class="nav-item h2">
            <a class="nav-link text-body" href="#">Settings</a>
          </li>

          <li class="nav-item h2">
            <a class="nav-link text-body" href="#">About</a>
          </li>

          <li class="nav-item h2">
            <a class="nav-link text-body" href="#">Logout</a>
          </li>

          <!-- TEMPORARY FOR DEVELOPMENT ONLY!!! -->
          <li class="nav-item h2">
            <a class="nav-link text-body" href="#" @click="clearLocalStorage">Clear storage (dev)</a>
          </li>
          <!-- END TEMPORARY FOR DEVELOPMENT ONLY!!! -->

          <hr />

          <li class="nav-item h2">
            <a class="nav-link text-body" href="#" data-bs-dismiss="offcanvas">Close menu</a>
          </li>

        </ul>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',

  methods: {
    clearLocalStorage() {
      // TODO: remove this method when done with development
      window.localStorage.clear();
    },
  },
}
</script>