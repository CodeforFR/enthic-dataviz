<template>
  <section class="container">
    <div class="partner-layout">
      <h2 class="title">L'écosystème</h2>
      <hr class="section-barre" />
      <div class="logo-list">
        <figure>
          <a href="https://www.enthic.fr"
            ><img
              src="@/assets/enthic.png"
              alt="logo Enthic"
              class="logo-partner scaleDown"
          /></a>
        </figure>
        <figure>
          <a href="https://codefor.fr/"
            ><img
              src="https://fork.osp.cat/uploads/decidim/organization/logo/1/medium_logo-code-for-france-alpha-gray.png"
              alt="logo Code For France"
              class="logo-partner"
          /></a>
        </figure>
        <figure>
          <a href="https://wexample.com/"
            ><img
              src="https://wexample.com/wp-content/uploads/2019/08/header-site-web-v3.png"
              alt="Logo Wexample"
              class="logo-partner scaleUp"
          /></a>
        </figure>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.logo-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  figure {
    margin: 1rem;
  }
}

@media (min-width: 960px) {
  .logo-list {
    flex-direction: row;
  }
}
.scaleDown {
  scale: 0.65;
}
.scaleUp {
  scale: 1.2;
}

.logo-partner {
  width: 50vmin;
  max-width: 150px;
}
.partner-layout {
  padding-top: 2rem;
  text-align: center;
  margin: auto 0;
  /* background: chocolate; */
}
</style>
