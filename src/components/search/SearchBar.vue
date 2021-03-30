<template>
  <section id="top" class="hero primary-bg">
    <div class="background columns is-centered top-section">
      <div class="column is-8">
        <form action="/recherche" method="GET" class="columns">
          <div class="column is-9">
            <div class="control has-icons-left is-large">
              <input
                type="search"
                name="text"
                class="input is-large"
                placeholder="Cherchez une entreprise par son nom"
              />
              <span class="icon is-left">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="column is-3 is-hidden-mobile">
            <button
              class="button is-fullwidth is-primary is-primary-b is-outlined is-large"
              style="padding-left: 0"
              type="submit"
            >
              <span class="is-hidden-touch" style="padding-left: 0.7em">
                Rechercher
              </span>
              <span class="icon is-hidden-desktop">
                <i class="fas fa-search"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
// TODO:
// - clean up styles

export default {};
</script>

<style></style>
