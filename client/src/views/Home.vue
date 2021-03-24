<template>
  <section>
    <Navbar />
    <div class="container mt-5">
        <h1 class="text-center">Let's Shopping with us</h1>
        <Banner />
         <div class="mt-3 mb-5 row mx-auto d-flex justify-content-center" style="width:100%">
            <HomeCard v-for="(product, id) in products" :key="id" :product="product" class="card col-3 m-2 border-0 shadow" style="width: 18rem;">
            </HomeCard>
         </div>
     </div>
  </section>
</template>

<script>
import Navbar from '../components/Navbar'
import { mapState } from 'vuex'
import HomeCard from '../components/HomeCard'
import Banner from '../components/Banner'

export default {
  methods: {
    fetchdata () {
      this.$store.dispatch('fetchProducts')
    }
  },
  computed: {
    ...mapState(['products'])
  },
  components: {
    Navbar, HomeCard, Banner
  },
  created () {
    this.fetchdata()
  }
}
</script>

<style>

</style>
