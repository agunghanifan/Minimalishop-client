<template>
  <section>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 0"></button>
        <button v-for="(banner, id) in banners" :key="id" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="banner.id" :aria-label="banner.id"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="http://www.readytodesign.com/images/top-bnr-8.jpg" class="d-block w-100" alt="banner">
        </div>
        <div v-for="(banner, id) in banners" :key="id" class="carousel-item">
          <img :src="banner.image_url" class="d-block w-100" :alt="banner.title">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    fetchBanners () {
      this.$store.dispatch('fetchBanners')
    }
  },
  computed: {
    ...mapState(['banners'])
  },
  created () {
    this.fetchBanners()
  }
}
</script>

<style>

</style>
