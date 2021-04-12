<template>
  <section class="container">
    <div class="columns is-centered">
      <div class="column is-10 content">
        <h2 class="has-text-centered">L'écosystème</h2>
        <div class="columns is-centered is-multiline is-vcentered">
          <div class="column is-3 is-mobile-center">
            <figure class="image is-128">
              <a href="https://www.enthic.fr"
                ><img src="/favicon.ico" alt="logo Enthic" class="is-128"
              /></a>
            </figure>
          </div>
          <div class="column is-3 is-mobile-center">
            <figure class="image is-128">
              <a href="https://codefor.fr/"
                ><img
                  src="https://fork.osp.cat/uploads/decidim/organization/logo/1/medium_logo-code-for-france-alpha-gray.png"
                  alt="logo Code For France"
                  class="is-128"
              /></a>
            </figure>
          </div>

          <div class="column is-3 is-mobile-center">
            <figure class="image is-128">
              <a href="https://wexample.com/"
                ><img
                  src="https://wexample.com/wp-content/uploads/2019/08/header-site-web-v3.png"
                  alt="Logo Wexample"
                  class="is-128"
              /></a>
            </figure>
          </div>
          <div class="column is-3 is-mobile-center">
            <figure class="image is-128">
              <a href="https://dataforgood.fr"
                ><img
                  src="https://dataforgood.fr/img/logo-white.png"
                  class="is-128"
                  alt="logo Data For Good"
              /></a>
            </figure>
          </div>
          <div class="column is-3 is-mobile-center">
            <figure class="image is-128">
              <a href="https://www.latitudes.cc/"
                ><img
                  src="//user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/1127947/550388_944467.png"
                  alt="logo Latitude - Exploring Tech for Good"
                  class="is-128"
              /></a>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.is-128 {
  width: 128px;
}
.logo-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  figure {
    margin: 1rem;
  }
}
@media (max-width: 960px) {
  .is-mobile-center {
    justify-content: center;
    display: flex;
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
