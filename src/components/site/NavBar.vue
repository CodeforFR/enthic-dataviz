<template>
  <nav
    class="navbar is-transparent navbar-layout"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link to="/">
        <img
          src="@/assets/enthic_without_bg.png"
          alt="Main logo"
          class="logo-enthic"
        />
      </router-link>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navMenu"
      >
        <i class="fas fa-bars burger-size"></i>
      </a>
    </div>
    <div id="navMenu" class="navbar-menu">
      <div class="navbar-end">
        <router-link class="navbar-item" to="/sbf120">Le SBF120</router-link>
        <router-link class="navbar-item" to="/tops">Les Tops</router-link>
        <a
          class="navbar-item"
          href="https://share.streamlit.io/lawiss/enthic-web-app/main/app.py"
          >Data Analyse</a
        >
        <a class="navbar-item">A propos</a>
        <a class="navbar-item">L'écosystème</a>
        <a class="navbar-item">Qui sommes-nous ?</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
</script>
