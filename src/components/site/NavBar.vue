<template>
  <div class="navbar-layout">
    <router-link to="/"
      ><img src="@/assets/enthic.png" alt="Main logo" class="logo-enthic" />
    </router-link>
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link is-arrowless"><i class="fas fa-bars"></i></a>
      <div class="navbar-dropdown is-right">
        <a class="navbar-item">A propos</a>
        <a class="navbar-item">L'écosystème</a>
        <a class="navbar-item">Qui sommes-nous ?</a>
        <hr class="navbar-divider" />
        <div class="navbar-item">Version 2.0.3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
